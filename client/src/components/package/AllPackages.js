import React from 'react';
import MaterialTable from 'material-table';

class AllPackages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: 'Customer Name', field: 'customername' },
        { title: 'Customer Phone', field: 'customerphone' },
        { title: 'Address', field: 'address' },
        { title: 'Arrival Date', field: 'arrivaldate', type: 'datetime' },
        {
          title: 'Vendor Name',
          field: 'vendorname',
          // lookup: { 1: 'ABC', 2: 'XYZ', 3: 'HIJ' },
        },
        { title: 'COD', field: 'cod', type: 'numeric' },
        { title: 'DC', field: 'dc', type: 'numeric' },
        { title: 'Delivery Date', field: 'deliverdate', type: 'datetime' },
        {
          title: 'Rider Name',
          field: 'ridername',
          // lookup: { 1: 'ABC', 2: 'XYZ', 3: 'HIJ' }
        },
        {
          title: 'Status',
          field: 'status',
          // lookup: { 34: 'Delivered', 63: 'Pending', 98: 'Returned' }
        }
      ],
      data: props.data,
      alternateData: [
        {
          customername: 'Mehmet',
          customerphone: '03333977937',
          address: 'Gulshan 5 near Disco Bakery',
          arrivaldate: '02.06.2019',
          vendorname: 2,
          cod: 2000,
          dc: 150,
          deliverdate: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
          ridername: 1,
          status: 63
        },
        {
          customername: 'Zerya Betül',
          customerphone: '03333977937',
          address: 'Gulshan 5 near Disco Bakery',
          arrivaldate: '03.06.2019',
          vendorname: 2,
          cod: 2000,
          dc: 150,
          deliverdate: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
          ridername: 1,
          status: 63
        },
      ]
    }
  }

  render() {
    // let packageContent;
    if (this.state.data === null) {
      this.setState({
        data: this.state.alternateData
      })
      // this.state.data = this.state.alternateData;
    }
    return (
      <MaterialTable
        title="Recent Packages"
        columns={this.state.columns}
        data={this.state.data}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...this.state.data];
                data.push(newData);
                this.setState({ ...this.state.data, data });
              }, 600);
            }),
          // onRowUpdate: (newData, oldData) => {
          //   if (newData.customerphone) {
          //     return (
          //       new Promise(resolve => {
          //         setTimeout(() => {
          //           resolve();
          //           const data = [...this.state.data];
          //           console.log(newData);
          //           console.log(oldData._id);
          //           data[data.indexOf(oldData)] = newData;
          //           this.setState({ ...this.state.data, data });
          //         }, 600);
          //       })
          //     )
          //   } else {
          //     return (
          //       new Promise(resolve => {
          //         resolve();
          //         const data = [...this.state.data];
          //         console.log(newData, data);
          //         alert("Please enter required fields")
          //       })
          //     )
          //   }
          // },
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...this.state.data];
                data.splice(data.indexOf(oldData), 1);
                this.setState({ ...this.state.data, data });
              }, 600);
            }),
        }}
      />
    );
  }
}

export default AllPackages;
// export default function MaterialTableDemo(props) {
//   const [state, setState] = React.useState({
//     columns: props.columns,
//     data: props.data
//     // columns: [
//     //   { title: 'Customer Name', field: 'customername' },
//     //   { title: 'Customer Phone', field: 'customerphone', type: 'numeric' },
//     //   { title: 'Address', field: 'address' },
//     //   { title: 'Arrival Date', field: 'arrivaldate', type: 'date' },
//     //   {
//     //     title: 'Vendor Name',
//     //     field: 'vendorname',
//     //     // lookup: { 1: 'ABC', 2: 'XYZ', 3: 'HIJ' },
//     //   },
//     //   { title: 'COD', field: 'cod', type: 'numeric' },
//     //   { title: 'DC', field: 'dc', type: 'numeric' },
//     //   { title: 'Delivery Date', field: 'deliverdate', type: 'date' },
//     //   {
//     //     title: 'Rider Name',
//     //     field: 'ridername',
//     //     // lookup: { 1: 'ABC', 2: 'XYZ', 3: 'HIJ' }
//     //   },
//     //   {
//     //     title: 'Status',
//     //     field: 'status',
//     //     // lookup: { 34: 'Delivered', 63: 'Pending', 98: 'Returned' }
//     //   }
//     // ],
//     // data: [
//     //   {
//     //     customername: 'Mehmet',
//     //     customerphone: '03333977937',
//     //     address: 'Gulshan 5 near Disco Bakery',
//     //     arrivaldate: '02.06.2019',
//     //     vendorname: 2,
//     //     cod: 2000,
//     //     dc: 150,
//     //     deliverdate: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
//     //     ridername: 1,
//     //     status: 63
//     //   },
//     //   {
//     //     customername: 'Zerya Betül',
//     //     customerphone: '03333977937',
//     //     address: 'Gulshan 5 near Disco Bakery',
//     //     arrivaldate: '02.06.2019',
//     //     vendorname: 2,
//     //     cod: 2000,
//     //     dc: 150,
//     //     deliverdate: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
//     //     ridername: 1,
//     //     status: 63
//     //   },
//     // ],
//   });

//   return (
//     <MaterialTable
//       title="Recent Packages"
//       columns={state.columns}
//       data={state.data}
//       editable={{
//         onRowAdd: newData =>
//           new Promise(resolve => {
//             setTimeout(() => {
//               resolve();
//               const data = [...state.data];
//               data.push(newData);
//               setState({ ...state, data });
//             }, 600);
//           }),
//         onRowUpdate: (newData, oldData) => {
//           if (newData.customerphone) {
//             return (
//               new Promise(resolve => {
//                 setTimeout(() => {
//                   resolve();
//                   const data = [...state.data];
//                   console.log(newData);
//                   data[data.indexOf(oldData)] = newData;
//                   setState({ ...state, data });
//                 }, 600);
//               })
//             )
//           } else {
//             return (
//               new Promise(resolve => {
//                 resolve();
//                 const data = [...state.data];
//                 console.log(newData, data);
//                 alert("Please enter required fields")
//               })
//             )
//           }
//         },
//         onRowDelete: oldData =>
//           new Promise(resolve => {
//             setTimeout(() => {
//               resolve();
//               const data = [...state.data];
//               data.splice(data.indexOf(oldData), 1);
//               setState({ ...state, data });
//             }, 600);
//           }),
//       }}
//     />
//   );
// }
