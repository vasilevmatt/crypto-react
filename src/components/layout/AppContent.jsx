import { Typography } from 'antd'
import Layout from 'antd/es/layout/layout';
import { useCrypto } from '../../context/crypto-context'

const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#021635',
  padding: '1rem'
};

export default function AppContent() {
  const {assets, crypto} = useCrypto()

  const cryptoPriceMap = crypto.reduce((acc, c) => {
    acc[c.id] = c.price
    return acc
  }, {})

	return (<Layout.Content style={contentStyle}>
    <Typography.Title level={3} style={
      {textAlign: 'left',
        color: 'white'
      }
    }>Portfolio: {assets.reduce((acc, asset) => {
      return acc += asset.amount * cryptoPriceMap[asset.id]
    }, 0).toFixed(3)} $</Typography.Title>
  </Layout.Content>)
}