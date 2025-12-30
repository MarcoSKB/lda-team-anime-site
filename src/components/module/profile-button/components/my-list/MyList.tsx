import { LinkButton } from "@/components/ui";
import { MenuItem } from "@headlessui/react";
import { BookHeart } from "lucide-react";

const MyList: React.FC = () => {
  return <MenuItem
      as={LinkButton}
      href='/anime-list'
      intent='secondary'
      size='small'
      title='Мой список'
      className='hover:bg-secondary py-1.5'
      icon={<BookHeart width={18} height={18} />}
    >
      Мой список
    </MenuItem>;
}

export default MyList;