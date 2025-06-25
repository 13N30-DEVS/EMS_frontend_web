# Component Usage

## Common Components

### Button
```
import Button from '../src/components/Common/Button';
<Button onClick={() => alert('Clicked!')}>Click Me</Button>
```

### Modal
```
import Modal from '../src/components/Common/Modal';
<Modal open={open} onClose={handleClose} title="My Modal">Modal Content</Modal>
```

### Notification
```
import Notification from '../src/components/Common/Notification';
<Notification message="Success!" type="success" onClose={handleClose} />
```

## Security Components

### ProtectedRoute
```
import ProtectedRoute from '../src/components/Security/ProtectedRoute';
// Use in your router
```

### RoleBasedRoute
```
import RoleBasedRoute from '../src/components/Security/RoleBasedRoute';
// Use in your router with allowedRoles prop
```

### SecurityContext
```
import { SecurityProvider, useSecurity } from '../src/components/Security/SecurityContext';
// Wrap your app with <SecurityProvider>
``` 