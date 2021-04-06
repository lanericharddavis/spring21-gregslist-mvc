import { ProxyState } from "../AppState.js";
import Job from "../Models/Job.js";
import { api } from "./AxiosService.js";


export class JobsService {

  async getJobs() {
    let response = await api.get("jobs")
    console.log(response.data)
    ProxyState.jobs = response.data.map(j => new Job(j))
  }


  async createJob(newJob) {
    let response = await api.post('jobs', newJob)
    console.log(response.data)
    response.data.id = response.data._id
    let job = new Job(response.data)
    ProxyState.jobs = [...ProxyState.jobs, job]
  }

  async deleteJob(id) {
    await api.delete('jobs/' + id)
    ProxyState.jobs = ProxyState.jobs.filter(job => job.id != id)
  }

  async applyJob(id) {
    let job = ProxyState.jobs.find(job => job.id === id)
    job.description += "You have Applied!"
    await api.put('jobs/' + id, { description: job.description })
    ProxyState.jobs = ProxyState.jobs
  }
}
export const jobsService = new JobsService();