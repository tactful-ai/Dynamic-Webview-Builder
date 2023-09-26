export const defineTicket = (editor) =>{
// Define the custom "ticket" component
    editor.DomComponents.addType('ticket', {
      model: {
        defaults: {
          type: 'ticket',
          ticketType: 'Question',
          priority: 'Normal',
          assignee: 'John Doe',
          status: 'Open',
          traits: [
            {
              type: 'select',
              name: 'ticketType',
              label: 'Ticket Type',
              options: ['Question', 'Task', 'Incident', 'Problem'],
            },
            {
              type: 'select',
              name: 'priority',
              label: 'Priority',
              options: ['Urgent', 'High', 'Normal', 'Low'],
            },
            {
              type: 'text',
              name: 'assignee',
              label: 'Assignee',
            },
            {
              type: 'select',
              name: 'status',
              label: 'Status',
              options: ['Open', 'In Progress', 'Closed'],
            },
          ],
        },
      },
      // Add the custom class for styling
      attributes: {
        class: 'ticket-form', // Apply custom styling for the ticket form
      },
    });  
    editor.BlockManager.add('ticket', {
        label: 'Ticket',
        category: "Custom Components",
        attributes: { class: "fa fa-ticket" },
    
        content: `<div data-gjs-type="ticket" >
        <form style="display: flex; flex-direction: column; align-items: center; border: 1px solid #ccc; border-radius: 4px; background-color: #f5f5f5; padding: 20px;">
        <div style="display: flex; flex-direction: row; align-items: center; margin-bottom: 10px;">
          <label for="ticketType" style="font-weight: bold; margin-right: 10px;">Ticket Type:</label>
          <select id="ticketType" class="form-control" name="type" style="background-color: rgba(0,0,0,0); padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-right: 10px;">
            <option value="Question">Question</option>
            <option value="Task">Task</option>
            <option value="Incident">Incident</option>
            <option value="Problem">Problem</option>
          </select>
        </div>
    
        <div style="display: flex; flex-direction: row; align-items: center; margin-bottom: 10px;">
          <label for="priority" style="font-weight: bold; margin-right: 10px;">Priority:</label>
          <select id="priority" class="form-control" name="priority" style="background-color: rgba(0,0,0,0); padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-right: 10px;">
            <option value="Urgent">Urgent</option>
            <option value="High">High</option>
            <option value="Normal">Normal</option>
            <option value="Low">Low</option>
          </select>
        </div>
    
        <div style="display: flex; flex-direction: row; align-items: center; margin-bottom: 10px;">
          <label for="assignee" style="font-weight: bold; margin-right: 10px;">Assignee:</label>
          <input type="number" id="assignee" class="form-control" name="assignee_id" style="background-color: rgba(0,0,0,0); padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
        </div>
    
        <div style="display: flex; flex-direction: row; align-items: center; margin-bottom: 10px;">
          <label for="status" style="font-weight: bold; margin-right: 10px;">Status:</label>
          <select id="status" class="form-control" name="status" style="background-color: rgba(0,0,0,0); padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-right: 10px;">
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
    
        <button data-gjs-type="custom-button" id="custom-button" class="custom-button" style="background-color: green; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;">Create</button>
      </form>
        </div>`,
      });


}