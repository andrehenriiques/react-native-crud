import React, { useContext } from 'react';
import { View, FlatList, Alert } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { Icon, Button } from 'react-native-elements';
import UsersContext from '../context/UsersContext';

export default props =>{

    // function getActions(user){
    //     return (
    //         <>
    //             <Button
    //                 onPress={()=> props.navigation.navigate('UserForm', user)}
    //                 type="clear"
    //                 icon={<Icon name="edit" size={25} color="orange"/>}
    //             />
    //         </>
    //     )
    // }

    const { state } = useContext(UsersContext)

    function confirmUserDelete(user){
        Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?', [
            {
                text: 'Sim',
                onPress(){
                    console.warn('Delete')
                }
            },
            {
                text: 'Não'
            }
        ])
    }

    function getUserItem({ item: user }) {
        return (
             <ListItem 
             onPress={()=> props.navigation.navigate('UserForm', user)}
             leftAvatar={{source: {uri: user.avatarUrl}}}
             rightElement="red"
             >
                <Avatar source={{ uri: user.avatarUrl }} />
                <ListItem.Content>
                    <ListItem.Title>{user.name}</ListItem.Title>
                    <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                </ListItem.Content>
                    <Button
                        onPress={()=> props.navigation.navigate('UserForm', user)}
                        type="clear"
                        icon={<Icon name="edit" size={25} color="orange"/>}
                    />
                    <Button
                        onPress={()=> confirmUserDelete(user)}
                        type="clear"
                        icon={<Icon name="delete" size={25} color="red"/>}
                    />
             </ListItem>
        ) 
    }

    return (
        <View>
            <FlatList
                keyExtractor={users => users.id.toString()}
                data={state.users}
                renderItem={getUserItem}
            />
        </View>
    )
}