#define GLSLIFY 1
// Common uniforms
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_frame;

// Common varyings
varying vec3 v_position;
varying vec3 v_normal;

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

/*
 * The main program
 */
void main() {
    // Use the mouse position to define the light direction
    float min_resolution = min(u_resolution.x, u_resolution.y);
    vec3 light_direction = -vec3((u_mouse - 0.5 * u_resolution) / min_resolution, 0.5);

    // Calculate the light diffusion factor
    float df = diffuseFactor(v_normal, light_direction);

    // Define the toon shading steps
    float nSteps = 4.0;
    float step = sqrt(df) * nSteps;
    step = (floor(step) + smoothstep(0.48, 0.52, fract(step))) / nSteps;

    // Calculate the surface color
    float surface_color = step * step;

    // Fragment shader output
    gl_FragColor = vec4(vec3(surface_color), 1.0);
}


 // vec4 fragCoord = gl_FragCoord;
        // float resolution = min(u_resolution.x, u_resolution.y);
        
        
        // float c_depth = texture(map, fragCoord.xy / resolution).r;
        // float depthLeft = texture(map, (fragCoord.xy - vec2(100.0, 0.0)) / resolution).r;
        // float depthRight = texture(map, (fragCoord.xy + vec2(101.0, 0.0)) / resolution).r;
        // float depthUp = texture(map, (fragCoord.xy - vec2(0.0, 101.0)) / resolution).r;
        // float depthDown = texture(map, (fragCoord.xy + vec2(0.0, 101.0)) / resolution).r;

        // float edgeThreshold = 0.001;
        // gl_FragColor = vec4( 0, 0, 0, 1 );

        // if (abs(c_depth - depthLeft) > edgeThreshold ||
        //     abs(c_depth - depthRight) > edgeThreshold ||
        //     abs(c_depth - depthUp) > edgeThreshold ||
        //     abs(c_depth - depthDown) > edgeThreshold) {
        //         gl_FragColor = vec4( 0, 0, 0, 1 );
        // }

        // gl_FragColor = vec4( clamp(c_depth, 0, r), 0, 0, 1 );