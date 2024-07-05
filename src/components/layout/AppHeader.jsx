import { Button, Drawer, Modal, Select, Space } from 'antd'
import Layout from 'antd/es/layout/layout';
import { useCrypto } from '../../context/crypto-context'
import { useEffect, useState } from 'react'
import CoinInfoModal from '../CoinInfoModal'
import AddAssetForm from '../AddAssetForm'

const headerStyle = {
  width: '100%',
  textAlign: 'center',
  color: '#fff',
  background: 'black',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};


export default function AppHeader() {
  const [select, setSelect] = useState(false)
  const [coin, setCoin] = useState(null)
  const [drawer, setDrawer] = useState(false)
  const [modal, setModal] = useState(false)
  const {crypto} = useCrypto()

  useEffect(() => {
    const keypress = event => {
      if (event.key === '/') {
        setSelect((prev) => !prev)
      }
    }
    document.addEventListener('keypress', keypress)
    return () => document.removeEventListener('keypress', keypress)
  }, [])

  function handleSelect(value) {
    setModal(true)
    setCoin(crypto.find(c => c.id === value))
  }

	return <Layout.Header style={headerStyle}>
     <Select
    value='press / to open'
    style={{ width: '250px' }}
    open={select}
    onSelect={handleSelect}
    onClick={() => setSelect((prev) => !prev)}
    options={crypto.map(coin => ({
      label: coin.name,
      value: coin.id,
      icon: coin.icon
    }))}
    optionRender={(option) => (
      <Space>
        <img style={{width: 20}} src={option.data.icon} alt={option.data.label}/> {option.data.label}
      </Space>
    )}
  />

<Button type="primary" onClick={() => setDrawer(true)}>Add asset</Button>
<Modal 
open={modal} 
onCancel={() => setModal(false)}
footer={null} >
        <CoinInfoModal coin={coin} />
      </Modal>

      <Drawer width={600} title="Add Asset" onClose={() => setDrawer(false)} open={drawer} destroyOnClose>
        <AddAssetForm onClose={() => setDrawer(false)}/>
      </Drawer>
  </Layout.Header>
}