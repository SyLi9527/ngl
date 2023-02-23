#define TOON

// uniform sampler2D map;
uniform vec2 u_resolution;
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 interiorColor;
uniform float interiorDarkening;
uniform float roughness;
uniform float metalness;
uniform float opacity;
uniform float clipNear;
uniform float clipRadius;

// #if defined( NEAR_CLIP ) || defined( RADIUS_CLIP ) || ( !defined( PICKING ) && !defined( NOLIGHT ) )
//     varying vec3 vViewPosition;
// #endif

#if defined( RADIUS_CLIP )
    varying vec3 vClipCenter;
#endif

#if defined( PICKING )
    uniform float objectId;
    varying vec3 vPickingColor;
#elif defined( NOLIGHT )
    varying vec3 vColor;
#else
    // #ifndef FLAT_SHADED
    //     varying vec3 vNormal;
    // #endif
    #include common
    #include packing
    #include dithering_pars_fragment
    #include color_pars_fragment
    #include uv_pars_fragment
    #include uv2_pars_fragment
    #include map_pars_fragment
    #include alphamap_pars_fragment
    // #include alphatest_pars_fragment
    #include aomap_pars_fragment
    // #include lightmap_pars_fragment
    #include emissivemap_pars_fragment
    #include gradientmap_pars_fragment
    #include fog_pars_fragment
    #include bsdfs
    #include lights_pars_begin
    // #include normal_pars_fragment
    #include lights_toon_pars_fragment
    #include shadowmap_pars_fragment
    #include bumpmap_pars_fragment
    #include normalmap_pars_fragment
    #include logdepthbuf_pars_fragment
    // #include clipping_planes_pars_fragment
#endif

void main(){

    #include nearclip_fragment
    #include radiusclip_fragment


    #if defined( PICKING )

        if( opacity < 0.3 )
            discard;
        gl_FragColor = vec4( vPickingColor, objectId );

    #elif defined( NOLIGHT )

        gl_FragColor = vec4( vColor, opacity );

    #else
        // #include clipping_planes_fragment

        vec4 diffuseColor = vec4( diffuse, opacity );
        ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
        vec3 totalEmissiveLight = emissive;

        #include logdepthbuf_fragment
        #include map_fragment
        #include color_fragment
        #include alphamap_fragment
        #include alphatest_fragment
        #include roughnessmap_fragment
        #include metalnessmap_fragment
        #include normal_fragment_begin
        #include normal_fragment_maps
        #include emissivemap_fragment
        // accumulation
        #include lights_toon_fragment
        #include lights_fragment_begin
        #include lights_fragment_maps
        #include lights_fragment_end
        // modulation
        #include aomap_fragment
        vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveLight;

        // Rim lighting effect
        // vec3 rim = vec3(1.0, 1.0, 1.0) - abs(vNormal);
        // rim = clamp(rim, 0.0, 1.0);
        // rim = mix(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, 0.0), rim);
        // outgoingLight = mix(outgoingLight, rim, 0.2);

        // Edge detection
        float edge_factor = step(0.4 - 0.3, dot(vNormal, normalize(vViewPosition))) -
                        step(0.4, dot(vNormal, normalize(vViewPosition)));
        outgoingLight = mix(outgoingLight, vec3(0.5, 0.5, 0.5), edge_factor);

        
        // Edge detection 2
        // float dep = gl_FragCoord.z / gl_FragCoord.w;
        // float delta = length(vec2(dFdx(dep), dFdy(dep)));
        // float border = smoothstep(0.2 - 0.01, 0.2, delta);

        // outgoingLight = mix(vec3(0.3, 0.3, 0.3), outgoingLight, 1.0 - border);
        
        gl_FragColor = vec4(outgoingLight, diffuseColor.a);

        #include tonemapping_fragment
        #include encodings_fragment
        #include fog_fragment
        #include premultiplied_alpha_fragment
        #include dithering_fragment

        #include opaque_back_fragment

        

        
    #endif

}

