import { StyleSheet,Platform, SafeAreaView,View } from "react-native";
import { primaryColor } from "../constants/colors";  

const styles = StyleSheet.create({
    //propiedades
    container: {backgroundColor:primaryColor,flex:1,paddingHorizontal:15},

});
export default Layout = ({children} ) =>{
    return (<SafeAreaView style= {styles.container}>
            <View style={{ paddingTop: Platform.OS === "android" && 30 }}> 
            {children}
            </View>
        </SafeAreaView>
    );
};

