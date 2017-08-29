/* App.js */
import Boards from './Boards'
import Example from './GiftedChatSample'

const App = () => (
  <Navigation>
    <Card
      {...cardProps}
      component={Boards}
    />
    <Card
      {...cardProps}
      component={GiftedChatSample}
    />
  </Navigation>
)