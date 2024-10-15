import { useLocalSearchParams } from "expo-router"
import { Text, View } from "react-native"

const ListTingItemPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  console.log({ id })
  return <View>
    <Text>Listing Item</Text>
  </View>
}

export default ListTingItemPage
