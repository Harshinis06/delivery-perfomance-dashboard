export interface DeliveryDetails {
    orderId: string;
    agentId: string;
    agentName: string;
    from: string;
    to: string;
    estimatedDate: string;   
    deliveredDate?: string;  
    status: 'Delivered' | 'Pending' | 'Delayed';
}
