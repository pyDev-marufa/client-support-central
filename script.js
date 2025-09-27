        // --- JavaScript  ---
        document.addEventListener('DOMContentLoaded', () => {

            // --- Data
            const initialTickets = [
                { id: 1, ticketId: '#1001', title: 'Login Issue: Account Access Denied', description: 'Customer is unable to log in after password reset.', customer: 'Jane Doe', priority: 'High', status: 'Open', created_at: '1/15/2024' },
                { id: 2, ticketId: '#1002', title: 'Payment Failed: Card Declined', description: 'User tried to make a payment, but the card was declined.', customer: 'John Smith', priority: 'High', status: 'Open', created_at: '1/16/2024' },
                { id: 3, ticketId: '#1003', title: 'Enable IP/Domain Whitelist', description: 'Customer needs to whitelist a new server IP for API access.', customer: 'Sarah Connor', priority: 'Medium', status: 'Open', created_at: '1/17/2024' },
                { id: 4, ticketId: '#1004', title: 'App Crash on Launch', description: 'User reports the app crashes immediately after opening.', customer: 'Michael Chen', priority: 'High', status: 'Open', created_at: '1/18/2024' },
                { id: 5, ticketId: '#1005', title: 'Reset Two-Factor Authentication', description: 'User lost their 2FA device and needs to reset their account.', customer: 'Emily Clark', priority: 'Medium', status: 'Open', created_at: '1/19/2024' },
                { id: 6, ticketId: '#1006', title: 'Subscription not Renewed', description: 'Subscription failed to renew automatically. Customer needs assistance.', customer: 'David Garcia', priority: 'Low', status: 'Open', created_at: '1/20/2024' },
                { id: 7, ticketId: '#1007', title: 'Missing Profile Information', description: 'User\'s profile picture and bio are missing after an update.', customer: 'Olivia Brown', priority: 'Low', status: 'Open', created_at: '1/21/2024' },
                { id: 8, ticketId: '#1008', title: 'Incorrect Billing Address', description: 'Customer needs to update their billing address on file.', customer: 'William Wilson', priority: 'Low', status: 'Open', created_at: '1/22/2024' },
                { id: 9, ticketId: '#1009', title: 'Data Export Failure', description: 'Failed to generate and download the monthly data export report.', customer: 'Liam Thomas', priority: 'Medium', status: 'Open', created_at: '1/23/2024' },
                { id: 10, ticketId: '#1010', title: 'Broken Hyperlink on Homepage', description: 'The main "Sign Up" button link on the homepage is broken.', customer: 'Isabella Garcia', priority: 'High', status: 'Open', created_at: '1/24/2024' },
            ];

            let tickets = [...initialTickets];
            let taskStatusList = [];

            // --- DOM Elements
            const customerTicketsContainer = document.getElementById('customer-tickets-container');
            const taskStatusContainer = document.getElementById('task-status-container');
            const resolvedTicketsContainer = document.getElementById('resolved-tickets-container');
            const inProgressCountEl = document.getElementById('in-progress-count');
            const resolvedCountEl = document.getElementById('resolved-count');
           
            const taskStatusInitialMessage = document.getElementById('task-status-initial-message');
            const resolvedTasksInitialMessage = document.getElementById('resolved-tasks-initial-message');

            // --- Utility Functions
            const showToast = (message, type) => {
                const toastContainer = document.getElementById('toast-container');
                const toastEl = document.createElement('div');
                toastEl.className = `toast toast-${type} shadow-lg`;
                toastEl.textContent = message;

                toastContainer.appendChild(toastEl);
                setTimeout(() => toastEl.classList.add('show'), 10);

                setTimeout(() => {
                    toastEl.classList.remove('show');
                    setTimeout(() => toastEl.remove(), 300);
                }, 3000);
            };

            const updateCounts = () => {
                const resolvedCount = tickets.filter(ticket => ticket.status === 'Resolved').length;
                const inProgressCount = tickets.filter(ticket => ticket.status === 'In Progress').length;
                resolvedCountEl.textContent = resolvedCount;
                inProgressCountEl.textContent = inProgressCount;
            };

            // ---  Functions
            const renderCustomerTickets = () => {
                const ticketHtml = tickets.filter(ticket => ticket.status !== 'Resolved').map(ticket => {
                    
                    const priorityTextColor = 
                        ticket.priority === 'High' ? 'text-red-400' :
                        ticket.priority === 'Medium' ? 'text-yellow-400' : 
                        'text-green-400'; 
                        

                    let statusClasses = '';
                    let statusColorDot = '';
                    
                    if (ticket.status === 'Open') {
                        statusClasses = 'bg-green-100 text-green-800'; 
                        statusColorDot = 'bg-green-500 w-3 h-3';
                    } else if (ticket.status === 'In Progress') {
                        statusClasses = 'bg-yellow-100 text-yellow-800'; 
                        statusColorDot = 'bg-yellow-500 w-3 h-3'; 
                    } else {
                        statusClasses = 'bg-gray-100 text-gray-800';
                        statusColorDot = 'bg-gray-500 w-3 h-3';
                    }

                    return `
                        <div class="p-4 bg-white rounded-lg border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col justify-between" data-ticket-id="${ticket.id}">
                            
                            <!-- Top Section (Title and Status) -->
                            <div class="flex justify-between items-start mb-2">
                                <h3 class="font-semibold text-gray-800 text-base mr-4">${ticket.title}</h3>
                                
                                <!-- Status Badge (Top Right) -->
                                <div class="flex items-center space-x-1 px-3 py-1 rounded-full ${statusClasses} flex-shrink-0">
                                    <span class="inline-block rounded-full ${statusColorDot}"></span>
                                    <span class="text-sm font-medium">${ticket.status}</span>
                                </div>
                            </div>
                            
                            <!-- Description -->
                            <p class="text-xs text-gray-600 mb-4">${ticket.description}</p>
                            
                            <!-- Bottom Section (ID, Priority, Customer, Date) -->
                            <div class="flex items-center justify-between text-xs text-gray-600 pt-2">
                                
                                <div class="flex items-center space-x-3">
                                    <!-- Ticket ID (No special color/style) -->
                                    <span class="font-medium text-gray-700">${ticket.ticketId}</span>

                                    <!-- Priority  -->
                                    <span class="text-xs font-semibold ${priorityTextColor} uppercase">${ticket.priority}</span>
                                </div>

                                <div class="flex items-center space-x-3">
                                   
                                    <span class="flex items-center space-x-1">
                                        <i class="fa-solid fa-user h-4 w-4 text-gray-400"></i>
                                        <span class="font-medium text-gray-700">${ticket.customer}</span>
                                    </span>
                                    
                                   
                                    <span class="flex items-center space-x-1">
                                        <i class="fa-solid fa-calendar-days h-4 w-4 text-gray-400"></i>
                                        <span class="font-medium">${ticket.created_at}</span>
                                    </span>
                                </div>

                            </div>
                        </div>
                    `;
                }).join('');
                customerTicketsContainer.innerHTML = ticketHtml;
            };

            const renderTaskStatus = () => {
              
                taskStatusInitialMessage.classList.toggle('hidden', taskStatusList.length > 0);
                
                if (taskStatusList.length === 0) {
                   
                    taskStatusContainer.innerHTML = '';
                } else {
                    const taskHtml = taskStatusList.map(task => {
                        return `
                            <div class="bg-white p-4 rounded-lg shadow-md flex flex-col mb-4">
                                <h3 class="font-semibold text-gray-800">${task.title}</h3>
                                <button class="w-full mt-3 bg-green-500 text-white text-sm font-medium py-2 rounded-lg hover:bg-green-600 transition duration-300 complete-task-btn" data-task-id="${task.id}">
                                    Complete
                                </button>
                            </div>
                        `;
                    }).join('');
                    taskStatusContainer.innerHTML = taskHtml;
                }
            };
            
            const renderResolvedTickets = () => {
                const resolvedTickets = tickets.filter(ticket => ticket.status === 'Resolved');
               
                resolvedTasksInitialMessage.classList.toggle('hidden', resolvedTickets.length > 0);

                if (resolvedTickets.length === 0) {
                    
                    resolvedTicketsContainer.innerHTML = '';
                } else {
                    const resolvedHtml = resolvedTickets.map(ticket => {
                        return `
                            <div class="p-4 bg-white rounded-lg shadow-sm mb-4 border border-gray-100">
                                <h3 class="font-semibold text-gray-800">${ticket.title}</h3>
                                <div class="flex items-center text-xs text-gray-500 mt-2 space-x-2">
                                    <span>Customer: ${ticket.customer}</span>
                                    <span>-</span>
                                    <span class="text-green-600 font-medium">Resolved</span>
                                </div>
                            </div>
                        `;
                    }).join('');
                    resolvedTicketsContainer.innerHTML = resolvedHtml;
                }
            };


            // --- Event Handlers
            customerTicketsContainer.addEventListener('click', (e) => {
                const ticketDiv = e.target.closest('[data-ticket-id]');
                if (!ticketDiv) return;

                const ticketId = parseInt(ticketDiv.dataset.ticketId);
                const ticketToUpdate = tickets.find(ticket => ticket.id === ticketId);

                // Check if the ticket is already in the task list or resolved
                if (taskStatusList.some(task => task.id === ticketId) || ticketToUpdate.status === 'Resolved' || ticketToUpdate.status === 'In Progress') {
                    showToast('This ticket is already being handled or resolved.', 'info');
                    return;
                }

                if (ticketToUpdate) {
                    ticketToUpdate.status = 'In Progress'; // Set status to 'In Progress'
                    taskStatusList.push(ticketToUpdate);
                    showToast(`Ticket "${ticketToUpdate.title}" added to Task Status.`, 'success');
                    updateCounts();
                    renderTaskStatus();
                    renderCustomerTickets(); 
                }
            });

            taskStatusContainer.addEventListener('click', (e) => {
                const completeBtn = e.target.closest('.complete-task-btn');
                if (!completeBtn) return;

                const taskId = parseInt(completeBtn.dataset.taskId);

                // Remove from Task Status list
                taskStatusList = taskStatusList.filter(task => task.id !== taskId);

                // Find the ticket in the main list and update its status
                const ticketToResolve = tickets.find(ticket => ticket.id === taskId);
                if (ticketToResolve) {
                    ticketToResolve.status = 'Resolved';
                }

                showToast('Task marked as complete!', 'success');
                renderTaskStatus();
                renderCustomerTickets();
                renderResolvedTickets(); // Re-render resolved list
                updateCounts();
            });

            // --- Initial 
            renderCustomerTickets();
            renderTaskStatus();
            renderResolvedTickets();
            updateCounts();
        });