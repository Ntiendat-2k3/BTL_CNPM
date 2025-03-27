import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf({
  duration: 1500, 
  position: {
    x: 'right',  
    y: 'bottom'
  },
  types: [
    {
      type: 'warning',
      background: 'orange', 
      icon: {
        className: 'material-icons',  
        tagName: 'i', 
        text: 'warning'  
      }
    },
    {
      type: 'error',
      background: 'indianred',
      duration: 2000, 
      dismissible: true  
    }
  ]
});

const Notification = () => {
  return null;
};

export const showSuccessNotification = (message) => {
  notyf.success(message);
};

export const showInfoNotification = (message) => {
  notyf.info(message);
};

export const showErrorNotification = (message) => {
  notyf.error(message);
};

export default Notification;
