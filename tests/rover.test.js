const { runRover } = require('../src/rover');
const plateau = { x: 5, y: 5 };

describe('Core Rover Logic', () => {
  test('Rover 1: 1 2 N + LMLMLMLMM → 1 3 N', () => {
    const rover={x:1,y:2,facing:'N',instructions:'LMLMLMLMM'.split('')};
    expect(runRover(rover, plateau)).toEqual({x:1,y:3,facing:'N'});
  });

  test('Rover 2: 3 3 E + MMRMMRMRRM → 5 1 E', () => {
    const rover = {x:3,y:3,facing:'E',instructions:'MMRMMRMRRM'.split('')};
    expect(runRover(rover, plateau)).toEqual({x:5,y:1,facing:'E'});
  });

  test('No instructions → rover stays put',()=>{
    const rover = {x:2,y:2,facing:'W',instructions:[]};
    expect(runRover(rover,plateau)).toEqual({x:2,y:2,facing:'W'});
  });

  test('Four right turns → back to original direction',() =>{
    const rover={x:2,y:2,facing:'N',instructions:'RRRR'.split('')};
    expect(runRover(rover,plateau).facing).toBe('N');
  });

  test('Throws when rover moves out of bounds', () => {
    const rover={x:0,y:0,facing:'S',instructions:['M']};
    expect(()=>runRover(rover,plateau)).toThrow('out of bounds');
  });

  test('Throws on collision with another rover', () => {
    const occupied=new Set(['2,3']);
    const rover={x:2,y:2,facing:'N',instructions:['M']};
    expect(()=>runRover(rover,plateau,occupied)).toThrow('Collision');
  });
});