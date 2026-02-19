# Electronic Logic

Transistors, vacuum tubes and (to a lesser degree) diodes can be used to create electronic switches which can be in turn used to build logic circuits. The logic circuits can be combined to build logic systems following the rules of [Boolean algebra](https://en.wikipedia.org/wiki/Boolean_algebra).

The [Boolean algebra](https://en.wikipedia.org/wiki/Boolean_algebra) is defined by binary variables and basic logic operations. Each boolean variable can be either <math><mn>0</mn></math> or <math><mn>1</mn></math> and the algebra defines 3 basic operations <math><mo>and</mo></math>, <math><mo>or</mo></math> and <math><mo>not</mo></math>. The operations are defined using truth tables bellow.

- <math><mo>not</mo></math> - the operation returns the inverse of the value of the argument
    |<math><mi>x</mi></math>|<math><mover><mi>x</mi><mo>‾</mo></mover></math>|
    |--|--|
    |0|1|
    |1|0|

- <math><mo>and</mo></math> - the operation results in <math><mn>1</mn></math> only if both arguments are <math><mn>1</mn></math>, otherwise the result is <math><mn>0</mn></math>

    |<math><mi>x</mi></math>|<math><mi>y</mi></math>|<math><mi>x</mi><mo>.</mo><mi>y</mi></math>|
    |--|--|--|
    |0|0|0|
    |0|1|0|
    |1|0|0|
    |1|1|1|

- <math><mo>or</mo></math> - the operation results in <math><mn>1</mn></math> if either of its argument are <math><mn>1</mn></math>, otherwise the result is <math><mn>0</mn></math> otherwise

    |<math><mi>x</mi></math>|<math><mi>y</mi></math>|<math><mi>x</mi><mo>+</mo><mi>y</mi></math>|
    |--|--|--|
    |0|0|0|
    |0|1|1|
    |1|0|1|
    |1|1|1|

# Logic Gates

Logic systems are built from logic gates, which represent logic operations of the [Boolean algebra](https://en.wikipedia.org/wiki/Boolean_algebra). It is possible to build gates implementing the basic operations <math><mo>and</mo></math>, <math><mo>or</mo></math> and <math><mo>not</mo></math>, but it is possible to build all possible operations using <math><mo>nand</mo></math> or <math><mo>nor</mo></math> gates, defined bellow.

- <math><mo>nand</mo></math> - inverse of the <math><mo>and</mo></math> operation
    |<math><mi>x</mi></math>|<math><mi>y</mi></math>|<math><mover><mrow><mi>x</mi><mo>.</mo><mi>y</mi></mrow><mo>‾</mo></mover></math>|
    |--|--|--|
    |0|0|1|
    |0|1|1|
    |1|0|1|
    |1|1|0|

- <math><mo>nor</mo></math> - inverse of the <math><mo>or</mo></math> operation
    |<math><mi>x</mi></math>|<math><mi>y</mi></math>|<math><mover><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>‾</mo></mover></math>|
    |--|--|--|
    |0|0|1|
    |0|1|0|
    |1|0|0|
    |1|1|0|

The basic operations can be built using a combination of only <math><mo>nand</mo></math> or <math><mo>nor</mo></math> gates:

- <math><mo>nand</mo></math>
    - <math><mover><mi>x</mi><mo>‾</mo></mover><mo>=</mo><mover><mrow><mi>x</mi><mo>.</mo><mi>x</mi></mrow><mo>‾</mo></mover></math>
    - <math><mi>x</mi><mo>.</mo><mi>y</mi><mo>=</mo><mover><mrow><mover><mrow><mi>x</mi><mo>.</mo><mi>y</mi></mrow><mo>‾</mo></mover><mo>.</mo><mover><mrow><mi>x</mi><mo>.</mo><mi>y</mi></mrow><mo>‾</mo></mover></mrow><mo>‾</mo></mover></math>
    - <math><mi>x</mi><mo>+</mo><mi>y</mi><mo>=</mo><mover><mrow><mover><mrow><mi>x</mi><mo>.</mo><mi>x</mi></mrow><mo>‾</mo></mover><mo>.</mo><mover><mrow><mi>y</mi><mo>.</mo><mi>y</mi></mrow><mo>‾</mo></mover></mrow><mo>‾</mo></mover></math>
- <math><mo>nor</mo></math>
    - <math><mover><mi>x</mi><mo>‾</mo></mover><mo>=</mo><mover><mrow><mi>x</mi><mo>+</mo><mi>x</mi></mrow><mo>‾</mo></mover></math>
    - <math><mi>x</mi><mo>.</mo><mi>y</mi><mo>=</mo><mover><mrow><mover><mrow><mi>x</mi><mo>+</mo><mi>x</mi></mrow><mo>‾</mo></mover><mo>+</mo><mover><mrow><mi>y</mi><mo>+</mo><mi>y</mi></mrow><mo>‾</mo></mover></mrow><mo>‾</mo></mover></math>
    - <math><mi>x</mi><mo>+</mo><mi>y</mi><mo>=</mo><mover><mrow><mover><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>‾</mo></mover><mo>+</mo><mover><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>‾</mo></mover></mrow><mo>‾</mo></mover></math>

# Physical Construction

Physical construction requires additional considerations. It must be decided what are the positive and negative voltage levels, which level represents logical <math><mn>0</mn></math> and <math><mn>1</mn></math> and these decisions come with advantages and drawbacks.

|GND|LOW|LOW threshold|---|HIGH threshold|HIGH|Vsupply|

Each logic circuit is defined by its input and output thresholds, which must match for the circuits to be able to be connected together. It is common that hte input and output thresholds are not exactly equal, but it is key that the high and low ranges do not overlap and there is enough space between high and low to avoid corruption by noise that would randomly switch levels.

Another consideration is which level represents logical <math><mn>0</mn></math> and <math><mn>1</mn></math>, the most common approach is to use high as the logical <math><mn>1</mn></math>, which is called positive logic. It is possible to have low represent the logical <math><mn>1</mn></math>, which is called negative logic, but is far less common.

# Discrete Logic

Discrete logic was the standard in the 1960s, it got replaced by integrated logic with the development of better manufacturing techniques. The chip with multiple integrated components is called an integrated circuit, or IC. The integration expanded from low integration (logic gate IC), through medium (basic component ICs) to high integration (microprocessors and GPUs).

Discrete logic is still used in a limited capacity for some applications that require specific parameters beyond what ICs can deliver (durability, etc).

Discrete logic has one huge advantage for learning and showcasing functionality, it is possible to build logical systems with LEDs that can be analyzed and debugged visually.

# Logic Families

Logic circuits constructed the same way and with compatible input and output levels are called a logic family. All circuits from a single family must be compatible with each other but there might require conversion to interface with other logic families.

# RTL Logic

There are multiple 