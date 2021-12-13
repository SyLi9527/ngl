/**
 * @file Colordata Colormaker
 * @author Fred Ludlow <fred.ludlow@gmail.com>
 * @private
 */

import { ColormakerRegistry } from '../globals'
import Colormaker, { ColormakerScale, manageColor, StuctureColormakerParams } from './colormaker'
import AtomProxy from '../proxy/atom-proxy'
import BondProxy from '../proxy/bond-proxy'


class StructuredataColormaker extends Colormaker {
  atomData?: { [key: number]: number }
  bondData?: { [key: number]: number }
  scale: ColormakerScale

  constructor(params: StuctureColormakerParams) {
    super(params)
    if (!params.scale) {
      this.parameters.scale = 'rwb'
    }
    this.atomData = this.parameters.data?.atomData
    this.bondData = this.parameters.data?.bondData
    this.scale = this.getScale(this.parameters)
  }

  @manageColor
  atomColor(a: AtomProxy) {
    const val = this.atomData?.[a.index]
    return  (val !== undefined) ? this.scale(val) : this.parameters.value
  }

  @manageColor
  bondColor(bond: BondProxy, fromTo: boolean) {
      const val = this.bondData?.[bond.index]
      return (val !== undefined) ?  this.scale(val) : this.parameters.value
  }
}

ColormakerRegistry.add('structuredata', StructuredataColormaker)

export default StructuredataColormaker