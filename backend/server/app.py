from dataclasses import dataclass
from os import getenv
from pathlib import Path

from quart import Quart
from server.architecture.service import ArchitectureService
from server.data.service import DataService
from server.data.sources import default_sources
from server.data.transforms import default_transforms
from server.layer.definitions import default_layers
from server.layer.service import LayerService
from server.model.service import ModelService
from server.views.blueprint import create_api_blueprint

DEFAULT_PATHS = {
    "architectures": "./architectures",
    "models": "./models",
    "train": "./train",
    "data": "./data",
}


@dataclass
class Services:
    layer: LayerService
    architecture: ArchitectureService
    data: DataService
    model: ModelService


def create_default_services() -> Services:
    layer_service = LayerService(default_layers)
    architecture_service = ArchitectureService(Path(getenv("ARCHITECTURES_PATH", DEFAULT_PATHS["architectures"])))
    data_service = DataService(Path(getenv("DATA_PATH", DEFAULT_PATHS["data"])), default_sources, default_transforms)
    model_service = ModelService(
        layer_service,
        data_service,
        architecture_service,
        Path(getenv("MODELS_PATH", DEFAULT_PATHS["models"])),
        Path(getenv("TRAIN_PATH", DEFAULT_PATHS["train"])),
    )

    return Services(
        layer=layer_service,
        architecture=architecture_service,
        data=data_service,
        model=model_service,
    )


async def create_app(services: Services):
    app = Quart(__name__)

    await services.model.start_training_task()

    # These are where the API endpoints are registered
    app.register_blueprint(
        create_api_blueprint(services.architecture, services.layer, services.data, services.model),
        url_prefix="/api",
    )

    return app


# Create subclass of Quart App?
