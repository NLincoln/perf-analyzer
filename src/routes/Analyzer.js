import React, { Component } from "react";
import styled from "styled-components";
import { Centered } from "../components/Centered";
import Card, { CardHeader, CardContent } from "../components/Card";
import { FormGroup, FormLabel, FormInput } from "../components/Form";
import Button from "@material-ui/core/Button";
import { executeRequests } from "./Analyzer/executeRequests";
import CircularProgress from "@material-ui/core/CircularProgress";
import HeadersInput from "../HeadersInput";
import { VictoryChart, VictoryBoxPlot, VictoryTheme } from "victory";
import { ResultList } from "../components/ResultList";

// https://coolors.co/4a4238-4d5359-508484-79c99e-97db4f

const Wrapper = styled.div`
  min-width: 80vw;
  display: grid;
  grid-gap: 15px;
  grid-template-areas: "raw-results form chart";
  @media (max-width: 1000px) {
    grid-template-areas:
      "form"
      "chart"
      "raw-results";
  }
`;

const UrlForm = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-areas:
    "url url"
    "name name"
    "warmup samples"
    "headers headers"
    "go go";
`;

const GridArea = styled.div`
  grid-area: ${props => props["grid-area"]};
`;

const GoButton = styled(Button)`
  width: 100%;
  background-color: #508484;
  &:hover {
    background-color: #508484;
  }
`;

const States = {
  waiting: "waiting",
  warming: "warming",
  running: "running"
};

const persistence = {
  persistState(state) {
    localStorage.setItem("perf-analyzer:state:analyzer", JSON.stringify(state));
  },
  hydrateState() {
    let defaultState = {
      url: "https://httpbin.org/headers",
      name: "",
      warmups: 10,
      samples: 25,
      headers: [
        {
          key: "Authorization",
          value: "Bearer "
        },
        {
          key: "",
          value: ""
        }
      ]
    };
    let storage = localStorage.getItem("perf-analyzer:state:analyzer");
    if (storage === null) {
      return defaultState;
    }
    return {
      ...defaultState,
      ...JSON.parse(storage)
    };
  }
};

export default class Analyzer extends Component {
  state = {
    results: [],
    error: null,
    state: States.waiting,
    form: persistence.hydrateState()
  };

  setFormState(updater, onFinish) {
    this.setState(
      prevState => {
        let nextState =
          typeof updater === "function" ? updater(prevState.form) : updater;
        return {
          form: {
            ...prevState.form,
            ...nextState
          }
        };
      },
      () => {
        persistence.persistState(this.state.form);
        onFinish && onFinish();
      }
    );
  }

  onChange = event => {
    this.setFormState({
      [event.target.name]: event.target.value
    });
  };

  getHeaders() {
    return this.state.form.headers
      .filter(header => header.key !== "" && header.value !== "")
      .reduce((prev, curr) => {
        prev[curr.key] = curr.value;
        return prev;
      }, {});
  }

  pressGo = () => {
    this.setState(prevState => ({
      state: States.warming,
      error: null,
      results: prevState.results.concat({
        name: this.state.form.name || this.state.form.url,
        resultset: []
      })
    }));
    /**
     * Execute warming requests
     */
    executeRequests({
      url: this.state.form.url,
      samples: this.state.form.warmups,
      headers: this.getHeaders()
    }).subscribe({
      error: err => {
        this.setState({
          error: err,
          state: States.waiting
        });
      },
      complete: () => {
        this.setState({
          state: States.running
        });
        executeRequests({
          url: this.state.form.url,
          samples: this.state.form.samples,
          headers: this.getHeaders()
        }).subscribe({
          error: err => {
            this.setState({
              error: err,
              state: States.waiting
            });
          },
          next: result => {
            this.setState(prevState => {
              let prevResults = prevState.results.slice(0, -1);
              let currentResults =
                prevState.results[prevState.results.length - 1];
              currentResults = {
                ...currentResults,
                resultset: [result, ...currentResults.resultset]
              };
              return {
                results: [...prevResults, currentResults]
              };
            });
          },
          complete: () => {
            this.setState({
              state: States.waiting
            });
          }
        });
      }
    });
  };

  render() {
    return (
      <Centered>
        <Wrapper>
          <GridArea grid-area="form">
            <Card>
              <CardHeader>Perf-Analyzer</CardHeader>
              <CardContent>
                <UrlForm>
                  <GridArea grid-area={"url"}>
                    <FormGroup>
                      <FormLabel>URL</FormLabel>
                      <FormInput
                        name={"url"}
                        placeholder={"http://localhost/path"}
                        value={this.state.form.url}
                        onChange={this.onChange}
                      />
                    </FormGroup>
                  </GridArea>
                  <GridArea grid-area={"name"}>
                    <FormGroup>
                      <FormLabel>Name</FormLabel>
                      <FormInput
                        name={"name"}
                        placeholder={"Name of test run"}
                        value={this.state.form.name}
                        onChange={this.onChange}
                      />
                    </FormGroup>
                  </GridArea>
                  <GridArea grid-area={"warmup"}>
                    <FormGroup>
                      <FormLabel>Warmup Samples</FormLabel>
                      <FormInput
                        name={"warmups"}
                        type={"number"}
                        value={this.state.form.warmups}
                        onChange={this.onChange}
                      />
                    </FormGroup>
                  </GridArea>
                  <GridArea grid-area={"samples"}>
                    <FormGroup>
                      <FormLabel>Samples</FormLabel>
                      <FormInput
                        name={"samples"}
                        type={"number"}
                        value={this.state.form.samples}
                        onChange={this.onChange}
                      />
                    </FormGroup>
                  </GridArea>
                  <GridArea grid-area={"headers"}>
                    <HeadersInput
                      value={this.state.form.headers}
                      onChange={headers =>
                        this.setFormState({
                          headers: headers
                        })
                      }
                    />
                  </GridArea>
                  <GridArea grid-area={"go"}>
                    <GoButton
                      disabled={this.state.state !== States.waiting}
                      variant={"contained"}
                      color={"primary"}
                      onClick={this.pressGo}
                    >
                      GO GO GO
                    </GoButton>
                  </GridArea>
                </UrlForm>
              </CardContent>
            </Card>
          </GridArea>
          {this.state.results.length > 0 && (
            <GridArea grid-area={"chart"}>
              <Card>
                <CardHeader> Results </CardHeader>
                <CardContent noPadding>
                  <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={20}
                    name={this.state.form.url}
                    categories={{
                      x: this.state.results.map(
                        (result, i) => `${i + 1}: ${result.name}`
                      )
                    }}
                  >
                    <VictoryBoxPlot
                      boxWidth={20}
                      data={this.state.results
                        .filter(({ resultset }) => resultset.length > 0)
                        .map(({ resultset }, i) => ({
                          x: i + 1,
                          y: resultset.map(result => result.time)
                        }))}
                    />
                  </VictoryChart>
                </CardContent>
              </Card>
            </GridArea>
          )}
          <GridArea grid-area={"raw-results"}>
            {this.state.state === States.warming ? (
              <Card>
                <CardHeader>Warming...</CardHeader>
                <CardContent centered>
                  <CircularProgress />
                </CardContent>
              </Card>
            ) : this.state.error ? (
              <Card>
                <CardHeader>Error</CardHeader>
                <CardContent centered>{this.state.error.message}</CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>Raw Results</CardHeader>
                {this.state.results.length > 0 ? (
                  <CardContent>
                    <ResultList
                      results={
                        this.state.results[this.state.results.length - 1]
                          .resultset
                      }
                    />
                  </CardContent>
                ) : (
                  <CardContent centered>
                    <div style={{ textAlign: "center" }}>
                      What are you waiting for?
                      <br />
                      GO GO GO!
                    </div>
                  </CardContent>
                )}
              </Card>
            )}
          </GridArea>
        </Wrapper>
      </Centered>
    );
  }
}
