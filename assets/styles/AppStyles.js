import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#82D58E',
      },
    
      taskWrapper: {
        paddingTop: 80,
        paddingHorizontal: 20,
      },
    
      sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff'
      },
    
      items: {
        marginTop: 30,
      },
    
      writeTaskWrapper: {
        position: 'absolute',
        bottom: 60,
        padding: 25,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 15,
      },
    
      input: {
        width: 270,
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        borderColor: '#C0C0C0',
        borderWidth: 1,
        borderRadius: 60,
      },
    
      addWrapper: {
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
        padding: 15,
      },
    
      addText: {
        color: '#7AB583',
      },
    
      clearAllWrapper: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: '#82D58E',
        borderRadius: 25,
        alignSelf: 'flex-end',
        marginTop: 10,
      },
    
      clearAllText: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 14,
      },
    
      emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        marginTop: 40,
      },
    
      catAnimation: {
        width: 250,
        height: 250,
      },
    
      emptyText: {
        marginTop: 10,
        fontSize: 16,
        fontStyle: 'italic',
        color: '#ffffff',
        opacity: 0.8,
      },
    
      subtleHint: {
        fontSize: 12,
        color: '#fff',
        opacity: 0.8,
        marginTop: 4,
      },
});

export default styles;