function parseInput(input){
    const lines=input.trim().split('\n').map(l=>l.trim()).filter(Boolean)
    const [px,py]=lines[0].split(' ').map(Number)
    const plateau={x:px,y:py}
    const rovers=[]
    for (i=1;i<lines.length;i+=2){
        const parts=lines[i].split(' ')
        const x = Number(parts[0])
        const y = Number(parts[1])
        const facing=parts[2].toUpperCase()
        const instructions=lines[i+1].toUpperCase().split(' ')
        rovers.push({x,y,facing,instructions})
    }
    return {plateau,rovers}
}
module.exports = { parseInput }