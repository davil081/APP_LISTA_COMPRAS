import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView} from 'react-native';
import { supabase } from './Conexao';


export default function App() {
  const [produtoDigitado, setProdutoDigitado] = useState("");
  const [valorDigitado, setValorDigitado] = useState("");
  const [quantidadeDigitada, setQuantidadeDigitada] = useState("");
  const [dados, setDados] = useState([]);

  //FUNÇÃO PARA CONSULTAR AS COMPRAS:
  const consultarCompras = async() => {
    const {data, error} = await supabase.from("tb_lista_compras")
    .select("*")
    if(error){ alert("Falha ao consultar! "+error.message)}
    else{
      setDados(data)
    }
  }
  useEffect(()=>{
    consultarCompras()
  },[])

  //FUNÇÃO PARA CADASTRAR AS COMPRAS:
  const cadastrarCompras = async(produto,vl, qtd) =>{
    if( produto == "" || vl == "" || qtd == "" ){
      alert('Preencha todos os campos!')
    }else{
      const {error} = await supabase.from("tb_lista_compras")
      .insert({coluna_produto: produto, 
             coluna_valor: vl,
             coluna_quantidade: qtd})
      if(error){
        alert("Falha ao cadastrar!")
      }else{
        alert("Cadastrado com sucesso!")
        consultarDados()
      }
    }
    
}

  return (
    <View style={estilos.container}>
      <Text style={{fontSize:20, margin:10}}>Cadastro de Compras:</Text>
      <TextInput
        onChangeText={(texto)=>setProdutoDigitado(texto)}
        placeholder='Digite a sua compra'
        style={estilos.cxText} />
      <TextInput
        onChangeText={(texto)=>setValorDigitado(texto)}
        placeholder='Digite o valor'
        style={estilos.cxText} />
      <TextInput
        onChangeText={(texto)=>setQuantidadeDigitada(texto)}
        placeholder='Digite a quantidade'
        style={estilos.cxText} />
      <Button
        title="Cadastrar"
        onPress={()=>cadastrarCompras(produtoDigitado, valorDigitado, quantidadeDigitada)} />
      
      <ScrollView>
        {dados.map((item)=>(
          <View style={estilos.cxCompras}>
            <Text> PRODUTO: {item.coluna_produto} </Text>
            <Text> VALOR: R${item.coluna_valor} </Text>
            <Text> QUANTIDADE: {item.coluna_quantidade} </Text>
          </View>
         )      
        )}
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  cxText:{
    borderWidth: 1,
    borderColor: "#c5c5c56",
    padding: 4,
    borderRadius: 4,
    marginBottom: 10
  },
  cxCompras:{
    borderWidth: 1,
    borderRadius: 8,
    minWidth: 300,
    padding: 10,
    margin: 15
  },
});
