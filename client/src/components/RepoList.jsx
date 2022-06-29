import React from 'react';

const RepoList = (props) => {
  return (
    <div>
      <h4> Repo List Component </h4>
      There are {props.repos.length} repos.
      {props.repos.map((item, i) => {
        console.log(item);
        return <table key={i}>
          <tr>
            <th>Username</th>
            <th>RepoId</th>
            <th>RepoName</th>
            <th>FileSize</th>
          </tr>
          <tr>
            <td>{item.username}</td>
            <td>{item.repoId}</td>
            <td><a href={item.repoLink} target={'_blank'}>{item.repoName}</a></td>
            <td>{item.size}</td>
          </tr>
        </table>
      })}
    </div>
  )
}


export default RepoList;