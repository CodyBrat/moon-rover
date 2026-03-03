const valid_directions=['N', 'E', 'S', 'W']
const valid_instructions=['L', 'R', 'M']

function validate({plateau,rovers}){
    if(isNaN(plateau.x) || isNaN(plateau.y) || plateau.x<0 || plateau.y<0){
        throw new Error('Plateau dimensions must be non-negative integers')
    }
    if(!rovers || rovers.length===0){
        throw new Error('At least one rover must be provided')
    }

    const startingPositions = new Set()
    rovers.forEach((rover,index)=>{
        const label = `Rover ${index+1}`
        if(!valid_directions.includes(rover.facing)){
            throw new Error(`${label} has invalid facing direction: "${rover.facing}". Must be N, E, S or W`)
        }
        if(rover.x<0 || rover.x>plateau.x || rover.y<0 || rover.y>plateau.y){
            throw new Error(`${label} has out of bounds starting position: (${rover.x},${rover.y})`)
        }
        const key=`${rover.x},${rover.y}`
        if(startingPositions.has(key)){
            throw new Error(`Collision detected: ${label} starts at (${rover.x},${rover.y}) which is already occupied by another rover`)
        }
        startingPositions.add(key)

        const badCmd = rover.instructions.find(cmd=>!valid_instructions.includes(cmd))
        if(badCmd){
            throw new Error(`${label} has invalid command: "${badCmd}". Must be L, R or M`)
        }
    })
}
module.exports = { validate };