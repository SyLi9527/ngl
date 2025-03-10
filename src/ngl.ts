/**
 * @file ngl
 * @private
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import './polyfills'
import _Promise from 'promise-polyfill'

/**
 * The NGL module. These members are available in the `NGL` namespace when using the {@link https://github.com/umdjs/umd|UMD} build in the `ngl.js` file.
 * @module NGL
 */

export {
  Debug, setDebug,
  MeasurementDefaultParams, setMeasurementDefaultParams,
  ScriptExtensions, ColormakerRegistry,
  DatasourceRegistry, DecompressorRegistry,
  ParserRegistry, RepresentationRegistry,
  setListingDatasource, setTrajectoryDatasource,
  ListingDatasource, TrajectoryDatasource
} from './globals'
export { autoLoad, getDataInfo, getFileInfo } from './loader/loader-utils'
import Selection from './selection/selection'
import PdbWriter from './writer/pdb-writer'
import SdfWriter from './writer/sdf-writer'
import StlWriter from './writer/stl-writer'
import Stage from './stage/stage'
import Viewer from './viewer/viewer'
import Collection from './component/collection'
import ComponentCollection from './component/component-collection'
import Component from './component/component'
import ShapeComponent from './component/shape-component'
import StructureComponent, {StructureRepresentationType} from './component/structure-component'
import SurfaceComponent from './component/surface-component'
import VolumeComponent, {VolumeRepresentationType} from './component/volume-component'
import RepresentationCollection from './component/representation-collection'
import RepresentationElement from './component/representation-element'
import Assembly from './symmetry/assembly'
import TrajectoryPlayer from './trajectory/trajectory-player'
import Superposition from './align/superposition'
export { superpose } from './align/align-utils'
export { guessElement, concatStructures } from './structure/structure-utils'

export { flatten, throttle, download, getQuery, uniqueArray } from './utils'
import Queue from './utils/queue'
import Counter from './utils/counter'
import Frames from './trajectory/frames'

//

import Colormaker from './color/colormaker'

import './color/atomindex-colormaker'
import './color/bfactor-colormaker'
import './color/chainid-colormaker'
import './color/chainindex-colormaker'
import './color/chainname-colormaker'
import './color/densityfit-colormaker'
import './color/electrostatic-colormaker'
import './color/element-colormaker'
import './color/entityindex-colormaker'
import './color/entitytype-colormaker'
import './color/geoquality-colormaker'
import './color/hydrophobicity-colormaker'
import './color/modelindex-colormaker'
import './color/moleculetype-colormaker'
import './color/occupancy-colormaker'
import './color/partialcharge-colormaker'
import './color/random-colormaker'
import './color/randomcoilindex-colormaker'
import './color/residueindex-colormaker'
import './color/resname-colormaker'
import './color/sstruc-colormaker'
import './color/structuredata-colormaker'
import './color/uniform-colormaker'
import './color/value-colormaker'
import './color/volume-colormaker'

//

import './component/shape-component'
import './component/structure-component'
import './component/surface-component'
import './component/volume-component'

//

import AngleRepresentation, {AngleRepresentationParameters} from './representation/angle-representation'
import AxesRepresentation, {AxesRepresentationParameters} from './representation/axes-representation'
import BackboneRepresentation from './representation/backbone-representation'
import BallAndStickRepresentation, {BallAndStickRepresentationParameters} from './representation/ballandstick-representation'
import BaseRepresentation from './representation/base-representation'
import CartoonRepresentation, {CartoonRepresentationParameters} from './representation/cartoon-representation'
import ContactRepresentation, {ContactRepresentationParameters} from './representation/contact-representation'
import DihedralRepresentation, {DihedralRepresentationParameters} from './representation/dihedral-representation'
import DihedralHistogramRepresentation, {DihedralHistogramRepresentationParameters} from './representation/dihedral-histogram-representation'
import DistanceRepresentation, {DistanceRepresentationParameters} from './representation/distance-representation'
import HelixorientRepresentation from './representation/helixorient-representation'
import HyperballRepresentation, {HyperballRepresentationParameters} from './representation/hyperball-representation'
import LabelRepresentation, {LabelRepresentationParameters} from './representation/label-representation'
import LicoriceRepresentation from './representation/licorice-representation'
import LineRepresentation, {LineRepresentationParameters} from './representation/line-representation'
import MolecularSurfaceRepresentation, {MolecularSurfaceRepresentationParameters} from './representation/molecularsurface-representation'
import PointRepresentation, {PointRepresentationParameters} from './representation/point-representation'
import RibbonRepresentation, {RibbonRepresentationParameters} from './representation/ribbon-representation'
import RocketRepresentation, {RocketRepresentationParameters} from './representation/rocket-representation'
import RopeRepresentation from './representation/rope-representation'
import SpacefillRepresentation from './representation/spacefill-representation'
import StructureRepresentation, {StructureRepresentationParameters} from './representation/structure-representation'
import TraceRepresentation, {TraceRepresentationParameters} from './representation/trace-representation'
import TubeRepresentation from './representation/tube-representation'
import UnitcellRepresentation, {UnitcellRepresentationParameters} from './representation/unitcell-representation'
import ValidationRepresentation from './representation/validation-representation'

import BufferRepresentation from './representation/buffer-representation'
import ArrowBuffer from './buffer/arrow-buffer'
import BoxBuffer from './buffer/box-buffer'
import ConeBuffer from './buffer/cone-buffer'
import CylinderBuffer from './buffer/cylinder-buffer'
import EllipsoidBuffer from './buffer/ellipsoid-buffer'
import MeshBuffer from './buffer/mesh-buffer'
import OctahedronBuffer from './buffer/octahedron-buffer'
import PointBuffer from './buffer/point-buffer'
import SphereBuffer from './buffer/sphere-buffer'
import TetrahedronBuffer from './buffer/tetrahedron-buffer'
import TextBuffer from './buffer/text-buffer'
import TorusBuffer from './buffer/torus-buffer'
import WidelineBuffer from './buffer/wideline-buffer'

//

import './parser/cif-parser'
import './parser/gro-parser'
import './parser/mmtf-parser'
import './parser/mol2-parser'
import './parser/pdb-parser'
import './parser/pdbqt-parser'
import './parser/pqr-parser'
import './parser/sdf-parser'

import './parser/prmtop-parser'
import './parser/psf-parser'
import './parser/top-parser'

import './parser/dcd-parser'
import './parser/nctraj-parser'
import './parser/trr-parser'
import './parser/xtc-parser'

import './parser/cube-parser'
import './parser/dsn6-parser'
import './parser/dx-parser'
import './parser/dxbin-parser'
import './parser/mrc-parser'
import './parser/xplor-parser'

import './parser/kin-parser'
import './parser/obj-parser'
import './parser/ply-parser'

import './parser/csv-parser'
import './parser/json-parser'
import './parser/msgpack-parser'
import './parser/netcdf-parser'
import './parser/text-parser'
import './parser/xml-parser'

import './parser/validation-parser'

//

import Shape from './geometry/shape'
import Kdtree from './geometry/kdtree'
import SpatialHash from './geometry/spatial-hash'
import Structure from './structure/structure'
import MolecularSurface from './surface/molecular-surface'
import Volume from './surface/volume'

//

import './utils/gzip-decompressor'

//

import './datasource/rcsb-datasource'
import './datasource/pubchem-datasource'
import './datasource/passthrough-datasource'
import './datasource/alphafold-datasource'
import StaticDatasource from './datasource/static-datasource'
import MdsrvDatasource from './datasource/mdsrv-datasource'

//

export {
  LeftMouseButton, MiddleMouseButton, RightMouseButton
} from './constants'
export {MouseActionCallback} from './controls/mouse-actions'
import MouseActions from './controls/mouse-actions'
import KeyActions from './controls/key-actions'
import PickingProxy from './controls/picking-proxy'

//

export { Signal } from 'signals'
export {
  Matrix3, Matrix4, Vector2, Vector3, Box3, Quaternion, Euler, Plane, Color
} from 'three'

//

export { UIStageParameters } from './ui/parameters'
export { StageParameters } from './stage/stage'
export { StructureComponentDefaultParameters } from './component/structure-component'

//

import Version from './version'

if (!(window as any).Promise) {
  (window as any).Promise = _Promise
}

export {
  Version,
  StaticDatasource,
  MdsrvDatasource,
  Colormaker,
  Selection,
  PdbWriter,
  SdfWriter,
  StlWriter,
  Stage,
  Viewer,
  Collection,
  ComponentCollection,
  RepresentationCollection,
  RepresentationElement,
  Component,
  ShapeComponent,
  StructureComponent,
  SurfaceComponent,
  VolumeComponent,
  StructureRepresentationType,
  VolumeRepresentationType,

  Assembly,
  TrajectoryPlayer,
  Superposition,
  Frames,

  Queue,
  Counter,

  AngleRepresentation,
  AngleRepresentationParameters,
  AxesRepresentation,
  AxesRepresentationParameters,
  BackboneRepresentation,
  BallAndStickRepresentation,
  BallAndStickRepresentationParameters,
  BaseRepresentation,
  CartoonRepresentation,
  CartoonRepresentationParameters,
  ContactRepresentation,
  ContactRepresentationParameters,
  DihedralRepresentation,
  DihedralRepresentationParameters,
  DihedralHistogramRepresentation,
  DihedralHistogramRepresentationParameters,
  DistanceRepresentation,
  DistanceRepresentationParameters,
  HelixorientRepresentation,
  HyperballRepresentation,
  HyperballRepresentationParameters,
  LabelRepresentation,
  LabelRepresentationParameters,
  LicoriceRepresentation,
  LineRepresentation,
  LineRepresentationParameters,
  MolecularSurfaceRepresentation,
  MolecularSurfaceRepresentationParameters,
  PointRepresentation,
  PointRepresentationParameters,
  RibbonRepresentation,
  RibbonRepresentationParameters,
  RocketRepresentation,
  RocketRepresentationParameters,
  RopeRepresentation,
  SpacefillRepresentation,
  StructureRepresentation,
  StructureRepresentationParameters,
  TraceRepresentation,
  TraceRepresentationParameters,
  TubeRepresentation,
  UnitcellRepresentation,
  UnitcellRepresentationParameters,
  ValidationRepresentation,

  BufferRepresentation,
  ArrowBuffer,
  BoxBuffer,
  ConeBuffer,
  CylinderBuffer,
  EllipsoidBuffer,
  MeshBuffer,
  OctahedronBuffer,
  PointBuffer,
  SphereBuffer,
  TetrahedronBuffer,
  TextBuffer,
  TorusBuffer,
  WidelineBuffer,

  Shape,

  Structure,
  Kdtree,
  SpatialHash,
  MolecularSurface,
  Volume,

  MouseActions,
  KeyActions,
  PickingProxy
}
