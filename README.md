# Ideas R Us Final Project

![](https://github.com/ckanich-classrooms/final-project-ideas-r-us/workflows/code%20quality/badge.svg)
![](https://github.com/ckanich-classrooms/final-project-ideas-r-us/workflows/Docker%20CI/badge.svg)


## Description

UIC MeFit is a Health Manager that provides users with health management tools such as personalized diet plan, hydration checks, weight tracker,social engagements and most importantly personalized fitness plans to the users.MeFit will enable fitness enthusiasts and non-fitness enthusiasts to embark on a journey to improve their mental and physical health.UIC MeFit is supported on all devices because it’s a webapp and allows users to seamlessly keep track of their daily lifestyle on the go.

We provide personalized diet plans depending on the users fitness needs using FatSecret API. Along with that, we provide personalized fitness plans cater to the users desired physique. MeFit will enable users to track their daily gym activity and weight by incorporating Google Fit API (TBD). This will provide our users with a progress report on their fitness journey. We will also be able to provide you locations to the nearest gyms and nearest restaurants that you could use your cheat days on by incorporating Google Maps API ;). Also 70 percent of our body is made up of water, don’t worry we will have an alert system ready in place for you to empty out them water bottles. To top it off with, we provided a social platform for our users to show off their healthy eating habits and fitness lifestyle to other MeFit users.


## Authors

| Member | Web dev level | Specialization |
| --- | --- | --- |
| Kiran Raju | Intermediate | Cloud: Convert entire app to be cloud-native using Azure|
| Peter Ekhator| Intermediate | DevOps: Build a deployment strategy using Azure Kubernetes Service|

## Deliverables for checkpoint 2
# CRUD Users
    - Able to create an user, update an user profile,delete an user 
    - Able to load an users data when logged in
    - Make sure the data is secure
    - Check MongoDB Connection

## Deliverables for checkpoint 4

Outline in English what the deliverables will be for checkpoint 4. Reminder that this is not *due*
until checkpoint 2, but failing to plan is planning to fail.

For each specialization, you must list specific checkpoints that are relevant to that particular specialization.
- Trying to establish an API connection for FatSecret API
- Try to finish most of the app functionality 
- Set up Cloud enivronment (Azure)
    - Trying to register for a Azure Account
    - Test the Connection
    - Make sure it's able to work properly

- Ensure other external API functionality are working properly
- Figure out a way to keep secrets secure from Github
- WRITE MORE TESTS!!!!!!!YAY
- Using DevOps Strategy to deploy using Azure Kubernets service

## Tests for Checkpoint 4 (fitness.js)
- describe('User Info/Settings')
- describe('Users Execise Routine')
- decribe('Users fitnes plans')
- describe('Google Fit API working properly')
## Deliverables for final project

Outline in English what the deliverables will be for the final checkpoint. This will should be
similar to the **Description** above, but written out as an explicit checklist rather than a human
readable description. Reminder that this is not *due* until checkpoint 4, but failing to plan is
planning to fail.

For each specialization, you must list specific checkpoints that are relevant to that particular specialization.

## Specialization deliverables

For each student/team adding a specialization, name that specialization and describe what
functionality you will be adding.

## Installation

- Install Docker <https://docs.docker.com/install/>.
- Install Docker Compose <https://docs.docker.com/compose/install/>
- Update `docker-compose.yml` with the latest image at <https://github.com/ckanich-classrooms/final-project-ideas-r-us/packages/>

### Deploy on locally 
- run `docker-compose up`

### Deploy to Azure
- Create Azure app service
- Update container settings with `docker-compose.yml` configuration file and github packages username and token
- Access web app using url in Azure app service overview blade
