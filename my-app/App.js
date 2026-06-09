import { Accelerometer } from 'expo-sensors';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [leitura, setLeitura] = useState({ x: 0, y: 0, z: 0 });
  const [ativo, setAtivo] = useState(true);

  useEffect(() => {
    Accelerometer.setUpdateInterval(100);

    let inscricao = null;

    if (ativo) {
      inscricao = Accelerometer.addListener(setLeitura);
    }

    return () => inscricao?.remove();
  }, [ativo]); 

  let { x, y, z } = leitura;

  const magnitudes = { X: Math.abs(x), Y: Math.abs(y), Z: Math.abs(z) };
  const maiorEixo = Object.entries(magnitudes).reduce((a, b) => a[1] > b[1] ? a : b)[0];

  const corDoEixo = { X: '#00F0FF', Y: '#FF003C', Z: '#FFF000' };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Acelerômetro</Text>

      <Text style={styles.eixoX}>Eixo X: {x.toFixed(2)}</Text>
      <Text style={styles.eixoY}>Eixo Y: {y.toFixed(2)}</Text>
      <Text style={styles.eixoZ}>Eixo Z: {z.toFixed(2)}</Text>

      <View style={styles.indicadorContainer}>
        <Text style={styles.indicadorLabel}>Maior força:</Text>
        <Text style={[styles.indicadorEixo, { color: corDoEixo[maiorEixo] }]}>
          Eixo {maiorEixo}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.botao, { backgroundColor: ativo ? '#FF003C' : '#00C853' }]}
        onPress={() => setAtivo(prev => !prev)}
      >
        <Text style={styles.botaoTexto}>{ativo ? ' Pare BB' : 'Rode negão'}</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
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
    fontSize: 48,
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
  },
  indicadorContainer: {
    marginTop: 30,
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#1a1a2e',
    width: 220,
  },
  indicadorLabel: {
    color: '#aaa',
    fontSize: 16,
    marginBottom: 4,
  },
  indicadorEixo: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  botao: {
    marginTop: 30,
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 30,
  },
  botaoTexto: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
});