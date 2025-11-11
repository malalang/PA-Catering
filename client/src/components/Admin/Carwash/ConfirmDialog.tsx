import Button from '@/components/ui/Button';

interface ConfirmDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	message: string;
}

export function ConfirmDialog({ isOpen, onClose, onConfirm, title, message }: ConfirmDialogProps) {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50'>
			<div className='bg-gray-900 rounded-lg p-6 max-w-md w-full'>
				<h2 className='text-xl font-bold text-white mb-4'>{title}</h2>
				<p className='text-white mb-6'>{message}</p>
				<div className='flex justify-end space-x-3'>
					<Button
						variant="danger"
						onClick={onClose}
					>
						Cancel
					</Button>
					<Button
						variant="primary"
						onClick={onConfirm}
					>
						Confirm
					</Button>
				</div>
			</div>
		</div>
	);
}
