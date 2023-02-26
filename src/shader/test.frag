#define STANDARD
#define TOON


uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 interiorColor;
uniform float interiorDarkening;
uniform float roughness;
uniform float metalness;
uniform float opacity;
uniform float clipNear;
uniform float clipRadius;
uniform vec2 resolution;
uniform vec2 mouse;

#if defined( NEAR_CLIP ) || defined( RADIUS_CLIP ) || ( !defined( PICKING ) && !defined( NOLIGHT ) )
    varying vec3 vViewPosition;
#endif

#if defined( RADIUS_CLIP )
    varying vec3 vClipCenter;
#endif

#if defined( PICKING )
    uniform float objectId;
    varying vec3 vPickingColor;
#elif defined( NOLIGHT )
    varying vec3 vColor;
#else
    #ifndef FLAT_SHADED
        varying vec3 vNormal;
    #endif
    #include common
    #include color_pars_fragment
    #include fog_pars_fragment
    #include bsdfs
    #include lights_pars_begin
    #include lights_physical_pars_fragment
    #include lights_toon_pars_fragment
    
#endif





// #include normal_pars_fragment
// #include shadowmap_pars_fragment
// #include bumpmap_pars_fragment
// #include normalmap_pars_fragment
// #include logdepthbuf_pars_fragment
// #include clipping_planes_pars_fragment

// float diffuseFactor(vec3 normal, vec3 light_direction) {
//     float df = dot(normalize(normal), normalize(light_direction));

//     if (gl_FrontFacing) {
//         df = -df;
//     }

//     return max(0.0, df);
// }

void main(){

    #include nearclip_fragment
    #include radiusclip_fragment
    // #if ( !defined( FLAT_SHADED ) ) && defined( NEAR_CLIP ) || defined( RADIUS_CLIP ) || ( !defined( PICKING ) && !defined( NOLIGHT ) )
    //     float min_resolution = min(resolution.x, resolution.y);
    //     vec3 light_direction = -vec3((mouse - 0.5 * resolution) / min_resolution, 0.5);

    //     // Calculate the light diffusion factor
    //     float df = diffuseFactor(vNormal, light_direction);

    //     // Define the toon shading steps
    //     float nSteps = 4.0;
    //     float step = sqrt(df) * nSteps;
    //     step = (floor(step) + smoothstep(0.48, 0.52, fract(step))) / nSteps;

    //     // Calculate the surface color
    //     float surface_color = step * step;

    //     #include color_fragment
    //     #include roughnessmap_fragment
    //     #include metalnessmap_fragment
    //     #include normal_fragment_begin

    //     #include lights_physical_fragment
    //     #include lights_fragment_begin
    //     #include lights_fragment_end

    //     // Fragment shader output
    //     gl_FragColor = vec4(vec3(surface_color), 1.0);
    //     // if (vViewPosition.x > 0.0) {
    //     //         gl_FragColor = vec4(0, 1, 0, 1);
    //     //     }
                
    //     // else {
    //     //     gl_FragColor = vec4(0, 0, 1, 1);
    //     // }


        
    // #else 
    //     gl_FragColor = vec4(1, 0, 0, 1);
    

    // #endif
    


    #if defined( PICKING )

        if( opacity < 0.3 )
            discard;
        gl_FragColor = vec4( vPickingColor, objectId );

    #elif defined( NOLIGHT )

        gl_FragColor = vec4( vColor, opacity );

    #else

        vec4 diffuseColor = vec4( diffuse, opacity );
        ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
        vec3 totalEmissiveLight = emissive;

        #include color_fragment
        #include roughnessmap_fragment
        #include metalnessmap_fragment
        #include normal_fragment_begin

        #include lights_physical_fragment
        #include lights_toon_fragment
        #include lights_fragment_begin
        #include lights_fragment_end

        vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveLight;

        #include interior_fragment

        gl_FragColor = vec4( outgoingLight, diffuseColor.a );

        #include premultiplied_alpha_fragment
        #include tonemapping_fragment
        #include encodings_fragment
        #include fog_fragment

        #include opaque_back_fragment



        // #include clipping_planes_fragment
        // vec4 diffuseColor = vec4( diffuse, opacity );
        // ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
        // vec3 totalEmissiveRadiance = emissive;
        // #include logdepthbuf_fragment
        // #include map_fragment
        // #include color_fragment
        // #include alphamap_fragment
        // #include alphatest_fragment
        // #include normal_fragment_begin
        // #include normal_fragment_maps
        // #include emissivemap_fragment
        // // accumulation
        // #include lights_toon_fragment
        // #include lights_fragment_begin
        // #include lights_fragment_maps
        // #include lights_fragment_end
        // // modulation
        // #include aomap_fragment
        // vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
        // #include interior_fragment
        // gl_FragColor = vec4( outgoingLight, diffuseColor.a );
        // #include tonemapping_fragment
        // #include encodings_fragment
        // #include fog_fragment
        // #include premultiplied_alpha_fragment
        // #include dithering_fragment



    #endif

}