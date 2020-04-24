import * as React from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Modal, Button, Dimensions } from 'react-native';
import MySectionList from './MySectionList';
import { COLORS } from '../constants/colors';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.middle,
  },
});

export default function Content(props) {

  const myKey = 'apiKey=sKw_oqVSmdk0cj8XolfkSyap__JKRPLt';
  // const myCollection = 'iereiAleksandrBartov';
        
  const [names, setNames] = React.useState([]);
  const [haveAnyRecord, setHaveAnyRecord] = React.useState(false);
  
  React.useEffect(() => {
    fetch(`https://api.mlab.com/api/1/databases/sinodik/collections/${props.username}?${myKey}`)
    .then(data => data.json())
    .then(allNamesArr => {
        if (allNamesArr.length<1) {
            setHaveAnyRecord(true);
            setNames([{name:''}]);
            return;
          }

          // CREATE SPECIAL OBJECT TO HOLDE ONLY UNICE DATA
        let GROUPS = new Set();
        allNamesArr.forEach(person=>person.group.forEach(g=>GROUPS.add(g)));
        let structuredArray = [...GROUPS]
          .map(group=>{
            return (
              {
                title: group,
                data: []
              }
            )
          });

          allNamesArr
          .filter(p => p.live === props.type)
          .forEach(person => {
            if(GROUPS.has(person.group[0])) {
              structuredArray.forEach(obj=>{
                if(obj.title === person.group[0]) obj.data.push(person);
              })
            }
          });
        // here we have to transform data for sectionList by Array.reduce()
        setNames(structuredArray);
    });
  }, []);

  return (
    <View style={styles.container}>{
      names.length < 1 ? <ActivityIndicator color={COLORS.deepBlue} size='large' /> : <MySectionList {...{ names }} />
    }
    <Modal
      animationType="slide"
      transparent={true}
      visible={haveAnyRecord}
      >
      <View style={{ marginTop: 22, justifyContent: 'flex-start', width: 200, height: 200, backgroundColor: 'red'}}>
        <Text>в вашем синодике пока нет ни одной записи</Text>
        <Button title="X" onPress={() => setHaveAnyRecord(false)} />
        <Button title="ДОБАВИТЬ ПОМИНОВЕНИЕ" onPress={() => {
          setHaveAnyRecord(false);
          props.setModalVisible(!props.modalVisible);
          props.navigation.navigate('Adding');
          }} />
      </View>
    </Modal>
    </View>
  );
}
