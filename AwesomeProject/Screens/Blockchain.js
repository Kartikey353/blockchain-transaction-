import React from 'react'
import { SafeAreaView, StyleSheet, TextInput, Text, Pressable } from 'react-native';
import { DataTable } from 'react-native-paper';
import { Alchemy, Network } from "alchemy-sdk";
const Blockchain = () => {
    const [text, onChangeText] = React.useState('');
    const [data, setdata] = React.useState([]);
    const [loader, setloader] = React.useState(true);
    const config = {
        apiKey: "tOlngHWvrJYw9XKnkDpJ0P4bLwezfCQI",
        network: Network.ETH_MAINNET,
    };
    const alchemy = new Alchemy(config);
    const fetchdata = async () => {
        setloader(true);
        const data = await alchemy.core.getAssetTransfers({
            fromBlock: "0x0",
            fromAddress: text,
            category: ["external", "internal", "erc20", "erc721", "erc1155"],
        });
        console.log(data.transfers);
        setdata(data.transfers);
        setloader(false);
    }
    return (
        <SafeAreaView style={styles.background}>
            <Text style={styles.title}>Blockchain data</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder='enter address'
            />
            <Pressable style={styles.button} onPress={fetchdata}>
                <Text style={styles.text}>Search</Text>
            </Pressable>
            <DataTable style={styles.container}>
                <DataTable.Header style={styles.tableHeader}>
                    <DataTable.Title>Block Number</DataTable.Title>
                    <DataTable.Title>Receiver</DataTable.Title>
                    <DataTable.Title>Amount</DataTable.Title>
                </DataTable.Header>
                {
                    loader === false ?
                        data.map((item, idx) => {
                            if (item.value !== null) {
                                return (
                                    <DataTable.Row key={idx}>
                                        <DataTable.Cell>{item.blockNum}</DataTable.Cell>
                                        <DataTable.Cell>{item.to}</DataTable.Cell>
                                        <DataTable.Cell>{item.value}</DataTable.Cell>
                                    </DataTable.Row>
                                )
                            } else {
                                // return (
                                //     <DataTable.Row key={idx}>
                                //         <DataTable.Cell>{item.blockNum}</DataTable.Cell>
                                //         <DataTable.Cell>{item.to}</DataTable.Cell>
                                //         <DataTable.Cell>{item.value}</DataTable.Cell>
                                //     </DataTable.Row>
                                // )
                            }
                        })
                        :
                        ""
                }
            </DataTable>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 30,
        borderWidth: 2,
        padding: 20,
        borderRadius: 50
    },
    background: {
        backgroundColor: "white",
        width: '100%',
        height: '100%'
    },
    title: {
        fontSize: 30,
        textAlign: "center",
        marginTop: "20%"
    },
    container: {
        padding: 15,
    },
    tableHeader: {
        backgroundColor: '#DCDCDC',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
        width: "50%",
        marginLeft: "auto",
        marginRight: "auto"
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    }
});
export default Blockchain