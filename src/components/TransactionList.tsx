import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format, formatDistanceToNow, fromUnixTime } from "date-fns";
import { Link } from "react-router-dom";
import TransactionListProps from "../../interfaces/TransactionListProps";

const TransactionList: React.FC<TransactionListProps> = ({
  txList,
  balance,
  touched,
}) => {
  return (
    <div className="first-line:overflow-hidden overflow-y-auto md:overflow-y-hidden transition-all duration-300 max-h-fit w-[90vw] h-full">
      {balance && (
        <h2 className="flex justify-between border-2 py-4 hover:bg-slate-500 mt-6 px-2 text-xs md:text-lg mb-4">
          Balance: <span>◎{balance}</span>
        </h2>
      )}
      {txList?.length > 0 && (
        <div className="overflow-x-auto">
          <Table className="w-full border-spacing-x-2 border-2 border-separate text-xs md:text-sm">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Signature</TableHead>
                <TableHead className="text-center">Block</TableHead>
                <TableHead className="text-center">Age</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {txList.map((transaction) => (
                <TableRow key={transaction?.signature}>
                  <TableCell className="truncate max-w-[40px] md:max-w-[190px] hover:underline text-left">
                    <Link to={`/tx/${transaction?.signature}`}>
                      {transaction?.signature}
                    </Link>
                  </TableCell>
                  <TableCell className="text-center">
                    {transaction?.slot}
                  </TableCell>
                  <TableCell
                    className="text-center"
                    title={format(
                      fromUnixTime(transaction?.blockTime),
                      "MMMM d, yyyy 'at' HH:mm:ss 0000"
                    )}
                  >
                    {formatDistanceToNow(fromUnixTime(transaction?.blockTime), {
                      includeSeconds: true,
                    })}
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-bold leading-none text-white ${
                        transaction?.confirmationStatus === "finalized"
                          ? "bg-green-500"
                          : "bg-yellow-400"
                      }`}
                    >
                      {transaction?.confirmationStatus}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      {touched && txList?.length <= 0 && (
        <div className="text-center">No transactions found.</div>
      )}
    </div>
  );
};

export default TransactionList;
