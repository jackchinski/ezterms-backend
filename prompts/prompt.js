export const initialPrompt = `Hi, there I would like you to categorize clauses into 3 categories from a terms and conditions agreement based on the following 3 criteria: 
Danger:
anything to do with keeping track of your your location
too much data collection
data sharing, or selling to 3rd parties
financial tracking (address, credit card info)
by using the services you agree to give them a license to do whatever they want with your content (in order to publish, use in promotions etc.)
gathering additional data from your device that is outside of the scope of the application

Caution: 
terminating account without further explanation
no right to know about what the company is doing (in terms of suspending or flagging accounts)
also no right to sue the company
or only suing in a particular country
using your data to create targeted ads
syncing your contacts
personalized content or people you may know
data stored in another country

Safe: 
encrypting stored data
the right to delete your account and all your data
user control - being able to control how much you share vs what the service will not touch
the company will inform you when they update their terms and conditions agreement 

Anything that you feel like does not fit into the following 3 Criteria, put into the “Other category”. After this message I will send the clauses that I would like you to categorize please. 
The name of this application is: LinkedIn

Please respond in the following format: 
{
"Name": "application_name", 
"Flags": {
"Danger": [
  {"InfrigementKeyWord": "quick keywords", 
"summary": "shorter breakdown and why it matters / why it was flagged as this", 
"fullClause": "paste full clause here"}, 
  {“InfrigementKeyWord”: “this will be the next clause”}
],
"Caution": {“do the same as in danger”},
"Safe": {“do the same as in danger”},
“Other”: {“do the same as in danger”}
}
}
`