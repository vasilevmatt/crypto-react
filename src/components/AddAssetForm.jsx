import { Button, Divider, Form, InputNumber, Select, Space, DatePicker, Result } from 'antd'
import { useRef, useState } from 'react'
import { useCrypto } from '../context/crypto-context'
import CoinInfo from './CoinInfo'

export default function AddAssetForm({onClose}) {

	const [form] = Form.useForm()
	const { crypto, addAsset } = useCrypto()
	const [coin, setCoin] = useState(null)
	const [submitted, setSubmitted] = useState(false)
  const assetRef = useRef()



	if (submitted) {
		return (  
			<Result
			status="success"
			title="New Asset was successfully added!"
			subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
			extra={[
				<Button type="primary" key="console" onClick={onClose}>
					Close
				</Button>
			]}
		/>)

	}

	if (!coin) {
		return  <Select
		style={ {width: '100%'} }
    placeholder='Select coin'
  
    onSelect={(v) => setCoin(crypto.find(c => c.id === v))}
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
	}

function handleAmountChange(value) {
	const price = form.getFieldValue('price')
	form.setFieldsValue({
		total: `${+(value * price).toFixed(2)} $`
	})
}

function onFinish(values) {
  const newAsset = {
    id: coin.id,
    amount: values.amount,
    price: values.price,
    date: values.date?.$d ?? new Date()
  }
  assetRef.current = newAsset
  setSubmitted(true)
  addAsset(newAsset)
}

function handlePriceChange(value) {
	const amount = form.getFieldValue('amount')
	form.setFieldsValue({
		total: `${+(amount * value).toFixed(2)} $`
	})
}

	return (
		<>
		<CoinInfo coin={coin}/>
		<Divider />
		<Form
		form={form}
    name="basic"
		onFinish={onFinish}
    labelCol={{
      span: 4,
    }}
    wrapperCol={{
      span: 10,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={ {price: +coin.price.toFixed(3)} }
    
  
    autoComplete="off"
  >
    <Form.Item
      label="Amount"
      name="amount"
      rules={[
        {
          required: true,
					type: 'number',
					min: 0,
          message: 'Please input amount!',
        },
      ]}
    >
      <InputNumber onChange={handleAmountChange} />
    </Form.Item>

    <Form.Item
      label="Price"
      name="price"
      
    >
      <InputNumber  onChange={handlePriceChange} style={ {width: '100%'} } />
    </Form.Item>
		<Form.Item
      label="Date & Time"
      name="date"
    >
      <DatePicker showTime />
    </Form.Item>
		<Form.Item
      label="Total"
      name="total"
      
    >
      <InputNumber placeholder='Enter coin amount' 
			 disabled style={ {width: '100%'} } />
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit">
        Add Asset
      </Button>
    </Form.Item>
  </Form>
	</>
	)
}