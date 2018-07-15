import React, { Component } from "react";
import styled from "styled-components";
import { Centered } from "../components/Centered";
import Card, { CardHeader, CardContent } from "../components/Card";
import { FormGroup, FormLabel, FormInput } from "../components/Form";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import HeadersInput from "../HeadersInput";
import {
  VictoryChart,
  VictoryBoxPlot,
  VictoryTheme,
  VictoryLine
} from "victory";
import { ResultList } from "../components/ResultList";
import { streamRequests } from "./Watcher/streamRequests";

const Wrapper = styled.div`
  min-width: 80vw;
  display: grid;
  grid-gap: 15px;
  grid-template-areas:
    "form form raw-results"
    "chart chart raw-results";
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
    "url"
    "samples"
    "headers"
    "watch";
`;

const GridArea = styled.div`
  grid-area: ${props => props["grid-area"]};
`;

const WatchButton = styled(Button)`
  width: 100%;
  background-color: #508484;
  &:hover {
    background-color: #508484;
  }
`;

const States = {
  waiting: "waiting",
  running: "running"
};

const persistence = {
  persistState(state) {
    localStorage.setItem("perf-analyzer:state:watcher", JSON.stringify(state));
  },
  hydrateState() {
    let defaultState = {
      url: "https://httpbin.org/headers",
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
    let storage = localStorage.getItem("perf-analyzer:state:watcher");
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
    if (this.state.state === States.running) {
      this.streamSub.unsubscribe();
      this.setState({
        state: States.waiting,
        error: null
      });
      return;
    }
    this.setState({
      state: States.running,
      error: null,
      results: []
    });
    this.streamSub = streamRequests({
      url: this.state.form.url,
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
          return {
            results: [result, ...prevState.results].slice(0, 25)
          };
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
                  <GridArea grid-area={"watch"}>
                    <WatchButton
                      variant={"contained"}
                      color={"primary"}
                      onClick={this.pressGo}
                    >
                      {this.state.state === States.running && "Stop!"}
                      {this.state.state === States.waiting && "Watch This!"}
                    </WatchButton>
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
                  >
                    <VictoryLine
                      data={Array.from(this.state.results)
                        .reverse()
                        .map((result, i) => ({
                          x: i + 1,
                          y: result.time
                        }))}
                    />
                  </VictoryChart>
                </CardContent>
              </Card>
            </GridArea>
          )}
          <GridArea grid-area={"raw-results"}>
            {this.state.error ? (
              <Card>
                <CardHeader>Error</CardHeader>
                <CardContent centered>{this.state.error.message}</CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>Raw Results</CardHeader>
                {this.state.results.length > 0 ? (
                  <CardContent>
                    <ResultList results={this.state.results} />
                  </CardContent>
                ) : (
                  <CardContent centered>
                    <div style={{ textAlign: "center" }}>
                      What are you waiting for?
                      <br />
                      Watch Out!
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
