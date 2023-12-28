import { ReactNode } from "react";

interface TableProps {
  header: ReactNode;
  children?: ReactNode;
}

const Table = (props: TableProps) => {
  const { header, children } = props;

  return (
    <table className='table-fixed w-full min-h-50'>
      <thead className='bg-gray-400 text-white'>{header}</thead>
      {children ? (
        <tbody>{children}</tbody>
      ) : (
        <tbody className='tracking-tight text-xl p-4 text-center font-bold'>
          <tr>
            <td colSpan={4} className='p-4'>
              Data Unavailable
            </td>
          </tr>
        </tbody>
      )}
    </table>
  );
};

export default Table;
