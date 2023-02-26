/**
 * @file Residueindex Colormaker
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 * @private
 */

import { ColormakerRegistry } from '../globals'
import { defaults } from '../utils'
import Colormaker, { StuctureColormakerParams, ColormakerScale, manageColor } from './colormaker'
import AtomProxy from '../proxy/atom-proxy'
import ChainProxy from '../proxy/chain-proxy'

/**
 * Color by residue index
 */
class ResidueindexColormaker extends Colormaker {
  scalePerChain: { [k: number]: ColormakerScale } = {}

  constructor (params: StuctureColormakerParams) {
    super(params)

    if (!params.scale) {
      this.parameters.scale = 'rainbow'
      this.parameters.reverse = defaults(params.reverse, true)
    }

    params.structure.eachChain((cp: ChainProxy) => {
      this.parameters.domain = [ cp.residueOffset, cp.residueEnd ]
      this.scalePerChain[ cp.index ] = this.getScale()
    })
  }

  @manageColor
  atomColor (a: AtomProxy) {
    // if (a.isHelix()) {
    //   return 0;
    // }

    // if(a.isSheet()) {
    //   // 
    //   return 16776960;
    // }
    // if (a.isTurn()) {
    //   // r
    //   return 65535;
    // }
    
    return this.scalePerChain[ a.chainIndex ](a.residueIndex)
  }
}

ColormakerRegistry.add('residueindex', ResidueindexColormaker)

export default ResidueindexColormaker
