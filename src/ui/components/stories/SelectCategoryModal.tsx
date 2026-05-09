
interface Props {
    repeatedGenre: string;
    onCancel: () => void;
    onSelect: (value: string, category: string) => void;
    loading: boolean;
}

const SelectCategoryModal = ({ repeatedGenre, onCancel, onSelect, loading }: Props) => {
  return (
    <div className="fixed inset-0 z-100 bg-black/90 flex flex-col items-center justify-center p-4">
        <div className="relative w-full max-w-lg aspect-square bg-search-bg rounded-lg overflow-hidden">
        
        </div>
    </div>
  )
}

export default SelectCategoryModal