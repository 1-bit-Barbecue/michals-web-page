# Current Source

Ideal current source maintains maintains constant current regardless of voltage across it because it has infinite output resistance. Practical current sources have finite output resistance and cannot sustain fixed current for all voltages.

It is usually better to build current sources using BJTs because they have more stable parameters - mainly the <math><msub><mi>V</mi><mi>be</mi></msub></math> (base-emitter voltage) is between 600 and 700 <math><mi>mV</mi></math> for discrete BJTs and is very consistent among the devices of the sme type. That is why I will refer to the supply voltage as <math><msub><mi>V</mi><mi>cc</mi></msub></math> on this page.

There are fairly simple current sources, like a single resistor or a divider-biased transistor, but they offer generally poor performance for a complexity comparable to the ones presented bellow.

The current source refers to both current sources and sinks, one pushes current into a load and the other draws current from a load.

## Current Mirror

<math><mi>Q1</mi></math> and <math><mi>Q3</mi></math> are diode connected BJTs that set the reference voltage for <math><mi>Q2</mi></math> and <math><mi>Q4</mi></math> based on the current set by <math><msub><mi>R</mi><mi>x</mi></msub></math> and <math><msub><mi>R</mi><mi>y</mi></msub></math>. The reference current is calculated as <math><msub><mi>I</mi><mi>out</mi></msub><mo>=</mo><msub><mi>I</mi><mi>ref</mi></msub><mo>=</mo><mfrac><mrow><msub><mi>V</mi><mi>cc</mi></msub><mo>-</mo><msub><mi>V</mi><mi>be</mi></msub></mrow><msub><mi>R</mi><mi>x</mi></msub></mfrac></math>. The diode connected BJT set the base voltage of the other BJT and thus *copies* the reference current.

> The reference base voltage is what the <math><mi>Q1</mi></math> base voltage would be if the current <math><msub><mi>I</mi><mi>ref</mi></msub></math> is injected into its collector.

![Basic current mirrors](./pages/1_Electronics/2_Analog_Electronics/BasicCurrentMirrors.png)

Key benefit of current mirrors is that a single reference can be then *copied* multiple times and used across a broader circuit. It is even possible to use on of the mirrors to bias a mirror of the opposite polarity (`source -> sink` or `sink -> source`). The following schematic shows both concepts, one NPN mirror feeds a load and the other biases a PNP mirror.

> The current value and stability degrades with every conversion from a sink to source and vice versa.

![NPN to PNP mirror conversion](./pages/1_Electronics/2_Analog_Electronics/MirrorConversion.png)

## Cascode Current Source

The predictable and consistent value of <math><msub><mi>V</mi><mi>be</mi></msub></math> can be used to design a current source independent of a source voltage. Adding a cascode transistor increases output resistance and isolates the reference current from the load.

The cascode current source is CTAT, the current decreases with increasing temperature, slightly (from <math><mn>1070</mn><mi>mA</mi></math> at <math><mn>0</mn><mi>°C</mi></math> to <math><mn>906</mn><mi>mA</mi></math> at <math><mn>60</mn><mi>°C</mi></math>, about <math><mn>10</mn><mo>%</mo></math>). This is caused by <math><msub><mi>V</mi><mi>be</mi></msub></math> decreasing for the same current with temperature. This effect is slightly mitigated by the current through <math><msub><mi>R</mi><mi>limit</mi></msub></math> increasing with temperature and thus slowing down the decrease of <math><msub><mi>V</mi><mi>be</mi></msub></math>. I consider this a good property since lower currents prevent thermal runaway.

> The <math><msub><mi>V</mi><mi>be</mi></msub></math> across <math><msub><mi>R</mi><mi>x</mi></msub></math> or <math><msub><mi>R</mi><mi>y</mi></msub></math> defines the current, the rest is basically logistics to set <math><msub><mi>r</mi><mi>o</mi></msub></math> and limit current. The current is calculated as <math><msub><mi>I</mi><mi>out</mi></msub><mo>=</mo><mfrac><msub><mi>V</mi><mi>be</mi></msub><msub><mi>R</mi><mi>x</mi></msub></mfrac></math>.

![Cascode current source](./pages/1_Electronics/2_Analog_Electronics/CascodeCurrentSources.png)

## Improved Current Mirror

Current mirrors can be improved by either dengenerating the transistors (adding a equal resistors between the emitter and ground or <math><msub><mi>V</mi><mi>cc</mi></msub></math>) or introducing a cascode transistor over the the transistor sourcing / sinking the current, but the basic topology is usually sufficient and the modifications limit the available voltage range across the source / sink transistor. A clever improvement is the [Wilson current mirror](https://en.wikipedia.org/wiki/Wilson_current_mirror).

One modification worth the effort is the combination of the current mirror and the cascode current source for reference. The effect that makes it worth it is the very low sensitivity to supply voltage (current does not change with the change of <math><msub><mi>V</mi><mi>cc</mi></msub></math>). It can be used to design circuits that can operate with broad spectrum of supply voltages.

![Cascode reference mirror](./pages/1_Electronics/2_Analog_Electronics/CascodeReferenceMirror.png)

## Dual Current Mirror Reference

It is possible to avoid the conversion of a source to a sink at the cost of slightly higher minimal supply voltage. The cascode current source can be built with both the NPN and PNP parts and provide both a source and a sink, which can be in turn used to bias current mirrors.

> The reference current is set purely by the the <math><msub><mi>R</mi><mi>x</mi></msub></math> or <math><msub><mi>R</mi><mi>y</mi></msub></math> resistor and can be set dynamically by using a potentiometer (or another form of a adjustable resistance). The current is calculated as <math><msub><mi>I</mi><mi>out</mi></msub><mo>=</mo><msub><mi>I</mi><mi>ref</mi></msub><mo>=</mo><mfrac><mrow><msub><mn>2</mn></msub><msub><mi>V</mi><mi>be</mi></msub></mrow><msub><mi>R</mi><mi>x</mi></msub></mfrac></math>.

![Dual cascode reference](./pages/1_Electronics/2_Analog_Electronics/DualCascodeReference.png)

## Sources

- [LTSpice simulation](./pages/1_Electronics/2_Analog_Electronics/CurrentMirrors.asc)
- Dual cascode current source - bias diode-connected transistors included and current set by a single-turn potentiometer (multi-turn version is more precise)
![Dual cascode source physical construction](./pages/1_Electronics/2_Analog_Electronics/CascodeCurrentSourceSink.png)
    - Size: 25x15mm
    - [KiCad project](./pages/1_Electronics/2_Analog_Electronics/CascodeCurrentSourceSink.KiCad.zip)
    - [FreeCAD project](./pages/1_Electronics/2_Analog_Electronics/CascodeCurrentSourceSink.FCStd)
    - [Layout print](./pages/1_Electronics/2_Analog_Electronics/CascodeCurrentSourceSink_25x15mm.ctb)