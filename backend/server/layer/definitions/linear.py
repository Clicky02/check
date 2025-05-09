import torch
from server.layer import LayerDefinition
from server.layer.input import InputDefinition
from server.layer.size import TensorSize
from server.params import BoolParameter, IntParameter
from server.params.constraints import WithRange

# found here: https://pytorch.org/docs/stable/nn.html#linear-layers


def linear_size_transformation(in_sizes: tuple[TensorSize, ...], out_features: int, **_) -> TensorSize:
    in_size = in_sizes[0]
    return TensorSize(in_size[:-1] + (out_features,))


linear_layer = LayerDefinition(
    "linear",
    "Linear",
    (InputDefinition(None, 1, None),),
    (
        IntParameter("out_features", "Output Features", 1, constraint=WithRange(1)),
        BoolParameter("bias", "Bias", True),
    ),
    lambda in_sizes, out_features, bias, **_: torch.nn.Linear(in_sizes[0][-1], out_features, bias),
    linear_size_transformation,
)

# TODO: Add multiple inputs
# def bilinear_size_transformation(in_sizes: tuple[TensorSize, ...], out_features: int, **_) -> TensorSize:
#     in_size = in_sizes[0]
#     return TensorSize(in_size[:-1] + (out_features,))

# bilinear_layer = LayerDefinition(
#     "bilinear",
#     "Bilinear",
#     (InputDefinition(None, 1, None), InputDefinition(None, 1, None)),
#     (
#         IntParameter("out_features", "Output Features", 1, constraint=WithRange(1)),
#         BoolParameter("bias", "Bias", True),
#     ),
#     lambda in_sizes, out_features, bias, **_: torch.nn.Bilinear(in_sizes[0][-1], in_sizes[1][-1], out_features, bias),
#     bilinear_size_transformation
# )
