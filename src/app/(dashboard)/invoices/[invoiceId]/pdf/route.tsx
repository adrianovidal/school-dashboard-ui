import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { NextResponse } from 'next/server';

export async function GET(request:Request,{params}:{params:{invoiceId:string}}) {
    const invoice = {
    id: 1,
    invoiceId: params.invoiceId,
    name: 'Google',
    dateCreated: Date.now(),
    phoneNumber: '(+351) 000 000 000',
    value: 1234,
    description: 'This is a sample invoice.',
    status: 'open',
    subtotal: '12.500,00',
    customer: {
      name: 'Yann Rainer',
      email: 'yannrainer@gmail.com'
    }
  };
  const stream = await ReactPDF.renderToStream(<Invoice invoice={invoice} />);
  return new NextResponse(stream as unknown as ReadableStream)
}

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#f3f4f6', // Cor de fundo semelhante ao bg-gray-100
        padding: 40,
        // fontFamily: 'Inter', // Usar a fonte registrada
    },
    invoiceContainer: {
        backgroundColor: '#ffffff', // bg-white
        borderRadius: 12, // rounded-xl
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', // shadow-2xl
        overflow: 'hidden',
        padding: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 32,
    },
    invoiceTitle: {
        fontSize: 36,
        fontWeight: 'extrabold', // '800'
        color: '#1f2937', // text-gray-900
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    invoiceNo: {
        fontSize: 18,
        color: '#4b5563', // text-gray-600
        marginTop: 4,
    },
    date: {
        textAlign: 'right',
        color: '#4b5563', // text-gray-600
        fontSize: 14,
    },
    clientInfo: {
        display: 'flex',
        flexDirection: 'row', // Para alinhar lado a lado em telas maiores
        justifyContent: 'space-between',
        marginBottom: 32,
        color: '#374151', // text-gray-700
    },
    clientInfoColumn: {
        flexDirection: 'column',
        width: '48%', // Ajuste conforme necessário
    },
    clientInfoLabel: {
        fontWeight: 'bold', // '600'
        color: '#1f2937', // text-gray-800
    },
    invoiceDetails: {
        textAlign: 'right',
    },
    tableWrapper: {
        marginBottom: 32,
        borderWidth: 1,
        borderColor: '#e5e7eb', // border-gray-200
        borderRadius: 8, // rounded-lg
        overflow: 'hidden',
    },
    table: {
        // width: 'auto',
        backgroundColor: '#ffffff', // bg-white
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f9fafb', // bg-gray-50
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb', // border-gray-200
    },
    tableCell: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 12,
        color: '#374151', // text-gray-700
        flexGrow: 1,
        width: 1,
    },
    tableHeaderCell: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 10,
        fontWeight: 'medium', // '500'
        color: '#6b7280', // text-gray-500
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        flexGrow: 1,
        width: 1
    },
    rightAlign: {
        textAlign: 'right',
    },
    subtotalSection: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 32,
    },
    subtotalBox: {
        backgroundColor: '#ef4444', // bg-red-500
        color: '#ffffff', // text-white
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8, // rounded-lg
        fontSize: 18,
        fontWeight: 'bold', // '700'
    },
    subtotalAmount: {
        marginLeft: 16,
    },
    bankInfo: {
        display: 'flex',
        flexDirection: 'row', // Para alinhar lado a lado em telas maiores
        justifyContent: 'space-between',
        marginBottom: 32,
        color: '#374151', // text-gray-700
    },
    bankInfoColumn: {
        flexDirection: 'column',
        width: '48%',
    },
    footerSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        color: '#374151', // text-gray-700
        marginTop: 48,
        paddingTop: 24,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb', // border-gray-200
    },
    footerText: {
        fontSize: 14,
        marginBottom: 4,
    },
    paymentTo: {
        fontWeight: 'bold', // '600'
        color: '#1f2937', // text-gray-800
    },
    contactInfo: {
        textAlign: 'right',
    },
    contactSpan: {
        marginLeft: 8,
    },
    thankyou: {
        fontSize: 18,
        fontWeight: 'bold', // '700'
        color: '#ef4444', // text-red-500
        marginTop: 8,
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
});

interface InvoiceProps {
  invoice: {
    id: number;
    invoiceId: string,
    name: string;
    phoneNumber: string,
    dateCreated: number;
    value: number;
    description: string;
    status: string;
    subtotal: string,
    customer: {
      name: string;
      email: string;
    }
  };
}

const Invoice = ({ invoice }: InvoiceProps) => {
  return (
    <Document title='The Creators Base'>
        <Page size="A4" style={styles.page}>
            {/* <View style={styles.invoiceContainer}> */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.invoiceTitle}>INVOICE</Text>
                        <Text style={styles.invoiceNo}>NO. { invoice.invoiceId }</Text>
                    </View>
                    <View style={styles.date}>
                        <Text>{ new Date(invoice.dateCreated).toLocaleDateString() }</Text>
                    </View>
                </View>

                <View style={styles.clientInfo}>
                    <View style={styles.clientInfoColumn}>
                        <Text style={styles.clientInfoLabel}>Client Name</Text>
                        <Text>{ invoice.name }</Text>
                    </View>
                    <View style={[styles.clientInfoColumn, styles.invoiceDetails]}>
                        <Text><Text style={styles.clientInfoLabel}>Date Issued :</Text> 15 June 20</Text>
                        <Text><Text style={styles.clientInfoLabel}>Invoice No :</Text> 23869</Text>
                    </View>
                </View>

                <View style={styles.tableWrapper}>
                    <View style={styles.table}>
                        <View style={styles.tableHeader}>
                            <Text style={styles.tableHeaderCell}>QTY</Text>
                            <Text style={styles.tableHeaderCell}>ITEM</Text>
                            <Text style={[styles.tableHeaderCell, styles.rightAlign]}>AMOUNT</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell}>01</Text>
                            <Text style={styles.tableCell}>Logo Design</Text>
                            <Text style={[styles.tableCell, styles.rightAlign]}>$ 2500.00</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell}>01</Text>
                            <Text style={styles.tableCell}>Brand Identity Design</Text>
                            <Text style={[styles.tableCell, styles.rightAlign]}>$ 2500.00</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell}>01</Text>
                            <Text style={styles.tableCell}>Website Design</Text>
                            <Text style={[styles.tableCell, styles.rightAlign]}>$ 2500.00</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.subtotalSection}>
                    <View style={styles.subtotalBox}>
                        <Text>SUBTOTAL <Text style={styles.subtotalAmount}>R$ { invoice.subtotal }</Text></Text>
                    </View>
                </View>

                <View style={styles.bankInfo}>
                    <View style={styles.bankInfoColumn}>
                        <Text style={styles.clientInfoLabel}>BANK INFO</Text>
                    </View>
                    <View style={[styles.bankInfoColumn, styles.invoiceDetails]}>
                        <Text><Text style={styles.clientInfoLabel}>Account no :</Text> 897 543 09</Text>
                        <Text><Text style={styles.clientInfoLabel}>Sort code :</Text> 12 98 54</Text>
                    </View>
                </View>

                <View style={styles.footerSection}>
                    <View>
                        <Text style={styles.footerText}>Please make payment to</Text>
                        <Text style={[styles.footerText, styles.paymentTo]}>{ invoice.customer.name }.</Text>
                        <Text style={styles.footerText}>201 Blvd, New York 67546</Text>
                    </View>
                    <View style={styles.contactInfo}>
                        <Text style={styles.footerText}>
                            <Text style={styles.paymentTo}>{ invoice.phoneNumber }</Text> <Text style={styles.contactSpan}>{ invoice.customer.email }</Text>
                        </Text>
                        <Text style={styles.footerText}>www.bankinfo.com</Text>
                        <Text style={styles.thankyou}>THANKYOU!</Text>
                    </View>
                </View>
            {/* </View> */}
            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (`${pageNumber} / ${totalPages}`)} fixed />
        </Page>
    </Document>
  )
}