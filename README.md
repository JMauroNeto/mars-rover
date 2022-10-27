# Mars-rover

Mars rover problem solution

The architecture was based on clean architecture

## Installation

Use the npm to install dependencies.

```bash
npm install
```

## Usage

It uses the input.txt file to get the instructions, following the pattern of the problem description, which is:

```
{integer} {integer} // plateau size
{integer} {integer} {N,S,E,W} // rover initial position
{M,L,R}{M,L,R}...{M,L,R} //rover instructions
{integer} {integer} {N,S,E,W} // rover initial position
{M,L,R}{M,L,R}...{M,L,R} //rover instructions
...
{integer} {integer} {N,S,E,W} // rover initial position
{M,L,R}{M,L,R}...{M,L,R} //rover instructions
```

It generates an output.txt file with the results


## Running
If you want to start with typescript, you can use 

```bash
npm run dev
```

If you want to transpile and run on node, you can use

```bash
npm run build && npm run start
```

## Tests
To run test suites, you can use
```bash
npm run test
```