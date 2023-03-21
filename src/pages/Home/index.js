import { StatusBar } from 'expo-status-bar';
import { useEffect,useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Actions from '../../components/Actions';

//components
import Header from '../../components/Header'
import Balance from '../../components/Header/Balance';
import Moviments from '../../components/Moviments';

// const list = [
//   {
//     id: 1,
//     label: 'Boleto conta luz',
//     value: "300,90",
//     date: "17/09/23",
//     type: 0,
//   },
//   {
//     id: 2,
//     label: 'Academia',
//     value: "90,00",
//     date: "20/09/23",
//     type: 0,
//   },
//   {
//     id: 3,
//     label: 'Pix cliente',
//     value: "200,90",
//     date: "25/09/23",
//     type: 1,
//   },
//   {
//     id: 4,
//     label: 'Salário',
//     value: "5.000,90",
//     date: "20/09/23",
//     type: 1,
//   }
// ]

const url = "http://localhost:8000/api/financia";


export default function Home() {

  const [list, setList] = useState([]);

  useEffect(() => {
    async function fetchData(){

      await fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {
          setList(data)
        })
      }

    fetchData();
  },[]);

  console.log(list);

  return (
    <View style={styles.container}>
        <Header name="Marcelo Gomes" />
        <Balance saldo="9.350,90" gastos="-527,00" />

        <Actions />

        <Text style={styles.title}>Últimas movimentações</Text>

        <FlatList 
          data={list}
          keyExtractor={(item) => String(item.id) }
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => <Moviments data={item} />}
          style={styles.list}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  title:{
    fontSize: 18,
    fontWeight: "bold",
    margin: 14,
  },
  list: {
    marginStart: 14,
    marginEnd: 14,
  }
});
