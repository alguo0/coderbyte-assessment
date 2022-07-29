# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1
Add ability for Facilities to save their own custom ids for each Agent they work with.
- Create a database migration for new table `FacilityAgentIds`. This table will have 3 columns: facility_id, agent_id and facility_agent_id. Both facility_id and agent_id should be primary key.
- Create a function `setFacilityAgentId`. It should accept 3 parameters: facility_id, agent_id and facility_agent_id, which corresponds to `FacilityAgentIds` columns, and make changes to the `FacilityAgentIds` table. In case there is already a row with same facility_id and agent_id composition, it should update the facility_agent_id field of that record with the given parameter. Otherwise, it should add a new record with given parameters.

Estimation: 2h

### Ticket 2
Modify `generateReport` function to include custom ids for each agent by facilities.
Currently, this function generates report with agent's id included from Agents table. We need to modify it so that it will include custom ids for each agent by facilities.
- Query `facility_agent_id` from `FacilityAgentIds` table where the `facility_id` and `agent_id` matches to those from the record of `Shifts` table, and use it to generate report. In case there is no matching record, leave it empty in the report.

Estimation: 2h
