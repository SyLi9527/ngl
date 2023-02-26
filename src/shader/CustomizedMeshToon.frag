#define TOON

// uniform sampler2D map;
uniform float u_time;
uniform vec2 u_mouse;
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


/*
 *  Calculates the diffuse factor produced by the light illumination
 */
float diffuseFactor(vec3 normal, vec3 light_direction) {
    float df = dot(normalize(normal), normalize(light_direction));

    if (gl_FrontFacing) {
        df = -df;
    }

    return max(0.0, df);
}

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
        // float scale = 1.0 / max(max(outgoingLight.x, outgoingLight.y), outgoingLight.z);

        // Use the mouse position to define the light direction
        float min_resolution = min(u_resolution.x, u_resolution.y);
        vec3 light_direction = -vec3((u_mouse - 0.5 * u_resolution) / min_resolution, 0.5);

        // Calculate the light diffusion factor
        float df = diffuseFactor(vNormal, light_direction);

        // Define the toon shading steps
        float nSteps = 2.0;
        float step_1 = sqrt(df) * nSteps;
        step_1 = (floor(step_1) + smoothstep(0.49, 0.51, fract(step_1))) / nSteps;

        // Calculate the surface color
        float surface_color = step_1 * step_1;

        // Fragment shader output
        float outgoingLight_len = length(outgoingLight);
        float surface_color_len = length(surface_color);
        float sum_len = outgoingLight_len + surface_color_len;

        outgoingLight = outgoingLight * 0.85 + surface_color * 0.15;



        // gl_FragColor = vec4(vec3(surface_color), 1.0);

        // Rim lighting effect
        // vec3 rim = vec3(1.0, 1.0, 1.0) - abs(vNormal);
        // rim = clamp(rim, 0.0, 1.0);
        // rim = mix(vec3(1.0, 1.0, 1.0), vec3(0.0, 0.0, 0.0), rim);
        // outgoingLight = mix(outgoingLight, rim, 0.2);

        // Edge detection
        // float edge_factor = step(0.4 - 0.3, dot(vNormal, normalize(vViewPosition))) -
        //                 step(0.4, dot(vNormal, normalize(vViewPosition)));
        // outgoingLight = mix(outgoingLight, vec3(0.1, 0.1, 0.1), edge_factor);

        
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

