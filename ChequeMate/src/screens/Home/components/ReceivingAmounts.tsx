import { theme } from "../../../themes/theme";
import VStack from "../../../components/Stacks/VStack";
import { Text } from "react-native-paper";
import { getChequesEstatisticas } from "../../../services/chequesService";
import { useEffect, useState } from "react";
import { EReceivingStatus } from "../../../enums/EnumReceivingAmount";

interface ReciveInMonthProps {
  name: string;
  status: EReceivingStatus;
}

interface Cheque {
  id: number;
  totalRecebidoMes: number;
  totalAReceber?: number;
}

export default function ReciveInMonth({ name, status }: ReciveInMonthProps) {
  const [total, setTotal] = useState<Cheque | null>(null);

  useEffect(() => { 
     async function fetchData() {
       try {
         const data = await getChequesEstatisticas();
         if(data) {
           setTotal(data);
         } else {
           setTotal({ id: 0, totalRecebidoMes: 0, totalAReceber: 0 });
         }
       } catch (err) {
         console.log("Erro ao carregar cheques:", err);
       }
     }
     fetchData();
   }, []);

  const displayValue = total 
    ? status === EReceivingStatus.RECEIVED 
      ? total.totalRecebidoMes || 0 
      : total.totalAReceber || 0
    : 0;

  return (
    <VStack style={{ padding: 20, borderRadius: 12, backgroundColor: theme.colors.input, gap: 8}}>
      <Text style={{ color: theme.colors.text, fontSize: 16 }}>{name}</Text>
      <Text style={{ 
        color: theme.colors.primary,
        fontSize: 16, 
        fontWeight: 'bold' 
      }}>
        {`R$${displayValue.toFixed(2)}`}
      </Text>
    </VStack>
  );
}