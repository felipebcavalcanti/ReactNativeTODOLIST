
import { useState } from "react";
import { Text, TextInput, View, TouchableOpacity, FlatList, Alert } from "react-native";
import { Participants } from "../components/Participants";

import { styles } from "./style";

export function Home() {

  const [participants, setParticipants] = useState<string[]>([""]);
  const [participantName, setParticipantName] = useState("");


  function handleParticipantAdd() {
    if (participants.includes(participantName)) {
      return Alert.alert("Participante Existente", "Já Existe um participante na lista com esse Nome")
    }

    setParticipants(prevState => [...prevState, participantName]);
    setParticipantName("");
  }

  function handleParticipantRemove(name: string) {
    Alert.alert("Remover", `Remover o participante ${name}?`, [
      {
        text: "Sim",
        onPress: () => setParticipants(prevState => prevState.filter(participants => participants !== name))

      },

      {
        text: "Não",

      }
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome do evento
      </Text>

      <Text style={styles.eventDate}>
        Sexta, 4 de Novembro de 2022.
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          keyboardAppearance="light"
          onChangeText={event => setParticipantName(event)}
          value={participantName}
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      {/*USANDO AGORA A FLATLIST PARA RENDENRIZAR A LISTA */}

      <FlatList
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Participants
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}

        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={{ color: "white" }}>
            Niguem chegou no evento ainda? Adicione o participante a sua lista de espera
          </Text>
        )}
      />

      {/* 
      MODO DE COMO RENDENRIZAR UMA LISTA COM O MAP E USANDO O SCROWVIEW
      <ScrollView>
        {
          participants.map((participant) =>(
            <Participants 
            key={participant} 
            name={participant}
            onRemove={handleParticipantRemove} 
            /> 
          ))
        } 
      </ScrollView> */}


    </View>
  )
}
