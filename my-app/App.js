import { Accelerometer } from 'expo-sensors';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [leitura, setLeitura] = useState({x: 0, y:0, z:0});
  useEffect(() => {
    //define quantos milissegundos entre cada leitura
    //100 ms = 10 leitura por segundos
    Accelerometer.setUpdateInterval(100);

    const inscricao = Accelerometer.addListener(setLeitura);

    return() => inscricao.remove();
  }, []);
    let {x, y, z} = leitura

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sensor ativo</Text>
      <Text style={styles.eixoX}>Eixo X:{x.toFixed(2)}</Text>
      <Text style={styles.eixoY}>Eixo Y:{y.toFixed(2)}</Text>
      <Text style={styles.eixoZ}>Eixo Z:{z.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 60, 
    fontWeight: 'bold', 
    marginBottom: 20,
  },
  eixoX: {
    fontSize: 40,
    color: '#00F0FF',
  },
  eixoY: {
    fontSize: 40,
    color: '#FF003C',
  },
  eixoZ: {
    fontSize: 40,
    color: '#FFF000',
  }
});
