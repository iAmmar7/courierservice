import React from 'react';
import isEmpty from '../../validation/is-empty';

function TopVendors(props) {
  let vendors, vendorTable = {};
  for (let i in props.packages) {
    if (!vendorTable[props.packages[i].vendorname]) {
      vendorTable[props.packages[i].vendorname] = 1;
    } else {
      vendorTable[props.packages[i].vendorname]++;
    }
  }

  if (isEmpty(vendorTable)) {
    vendors = (
      <tr>
        <td>No vendors added</td>
        <td></td>
      </tr>
    )
  } else {
    vendors = Object.keys(vendorTable).map((item, key) => {
      return (
        <tr key={key}>
          <td>{item}</td>
          <td className="h2">{vendorTable[item]} pckgs</td>
        </tr>
      )
    })
  }
  return (
    <tbody>
      {vendors}
    </tbody>

  )
}

export default TopVendors;