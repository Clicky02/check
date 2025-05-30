from torch.utils.data import Dataset
from server.data.sources.base import DataSource
from server.util.override_decorator import override

from abc import ABC
from typing import Any, Generic, TypeVar


TDs = TypeVar("TDs", bound=Dataset)


class TorchDatasetSource(DataSource, Generic[TDs], ABC):
    dataset: TDs
    use_labels: bool

    def __init__(self, dataset: TDs, use_labels: bool = False):
        super().__init__()
        self.dataset = dataset
        self.use_labels = use_labels

    @override
    def _get(self, index: int) -> Any:
        return self.dataset[index][1 if self.use_labels else 0]

    @override
    def __len__(self) -> int:
        return len(  # TODO: enforce having __len__ defined using types
            self.dataset  # type:ignore Most have len defined
        )
