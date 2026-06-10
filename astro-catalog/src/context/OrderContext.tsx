import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from 'react';
import { loadDraft, saveDraft, type DraftItem } from '../lib/order';

type OrderContextValue = {
	/** Productos en el borrador del pedido. */
	items: DraftItem[];
	addItem: (item: DraftItem) => void;
	removeItem: (index: number) => void;
	clear: () => void;
	/** Estado del cajón (drawer) del pedido. */
	isDrawerOpen: boolean;
	openDrawer: () => void;
	closeDrawer: () => void;
	toggleDrawer: () => void;
};

const OrderContext = createContext<OrderContextValue | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
	const [items, setItems] = useState<DraftItem[]>(() => loadDraft());
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	// El borrador se persiste en localStorage en cada cambio.
	useEffect(() => {
		saveDraft(items);
	}, [items]);

	const addItem = useCallback((item: DraftItem) => {
		setItems((prev) => [...prev, item]);
	}, []);

	const removeItem = useCallback((index: number) => {
		setItems((prev) => prev.filter((_, i) => i !== index));
	}, []);

	const clear = useCallback(() => setItems([]), []);

	const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
	const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);
	const toggleDrawer = useCallback(() => setIsDrawerOpen((v) => !v), []);

	const value = useMemo<OrderContextValue>(
		() => ({
			items,
			addItem,
			removeItem,
			clear,
			isDrawerOpen,
			openDrawer,
			closeDrawer,
			toggleDrawer,
		}),
		[items, addItem, removeItem, clear, isDrawerOpen, openDrawer, closeDrawer, toggleDrawer],
	);

	return <OrderContext value={value}>{children}</OrderContext>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useOrder(): OrderContextValue {
	const ctx = useContext(OrderContext);
	if (!ctx) {
		throw new Error('useOrder debe usarse dentro de <OrderProvider>');
	}
	return ctx;
}
