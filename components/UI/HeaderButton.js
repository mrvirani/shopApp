// import React from "react";

// import { HeaderButton } from 'react-navigation-header-buttons'

// import Icon from 'react-native-vector-icons/FontAwesome';

// // import {Ionicons} from '@expo/vector-icons'

// const CutomeHeaderButton =(props)=>{
//     return(
        
//         <HeaderButton
//          {...props}
//            IconComponent={Icon}
//             iconSize={23} 
//             color={'white'} />  

//     )
// }

// export default CutomeHeaderButton   


// CustomHeaderButton.js
import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton {...props} IconComponent={Icon} iconSize={23} color={'white'} />
  );
}

export default CustomHeaderButton;
