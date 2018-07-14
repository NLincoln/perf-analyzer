import React, { Component } from "react";
import styled from "styled-components";
import { Centered } from "./components/Centered";
import Card, { CardHeader, CardContent } from "./components/Card";
import { FormGroup, FormLabel, FormInput } from "./components/Form";
import Button from "@material-ui/core/Button";
import { executeRequests } from "./executeRequests";
import { CircularProgress } from "@material-ui/core";
import StatusCode from "./components/StatusCode";
import HeadersInput from "./HeadersInput";

// https://coolors.co/4a4238-4d5359-508484-79c99e-97db4f

const Wrapper = styled.div`
  min-width: 50vw;
  display: grid;
  grid-gap: 15px;
`;

const UrlForm = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-areas:
    "url url"
    "warmup samples"
    "headers headers"
    "go go";
`;

const GridArea = styled.div`
  grid-area: ${props => props["grid-area"]};
`;

const ResultList = styled.ul`
  list-style: none;
`;

const Result = styled.li`
  margin: 0;
`;

const GoButton = styled(Button)`
  width: 100%;
`;

const States = {
  waiting: "waiting",
  warming: "warming",
  running: "running"
};

const persistence = {
  persistState(state) {
    localStorage.setItem("perf-analyzer:state", JSON.stringify(state));
  },
  hydrateState() {
    let defaultState = {
      url: "http://localhost/api/auth/v1/versions",
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
    let storage = localStorage.getItem("perf-analyzer:state");
    if (storage === null) {
      return defaultState;
    }
    return {
      ...defaultState,
      ...JSON.parse(storage)
    };
  }
};

class App extends Component {
  state = {
    results: [],
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
    if (this.request$) {
      this.request$.unsubscribe();
    }
    this.setState({
      results: [],
      state: States.warming
    });
    /**
     * Execute warming requests
     */
    this.request$ = executeRequests({
      url: this.state.form.url,
      samples: this.state.form.warmups,
      headers: this.getHeaders()
    }).subscribe({
      complete: () => {
        this.setState({
          state: States.running
        });
        this.request$ = executeRequests({
          url: this.state.form.url,
          samples: this.state.form.samples,
          headers: this.getHeaders()
        }).subscribe(result => {
          this.setState(prevState => {
            return {
              results: [...prevState.results, result]
            };
          });
        });
      }
    });
  };

  render() {
    return (
      <Centered>
        <Wrapper>
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
          {this.state.state === States.warming && (
            <Card>
              <CardHeader>Warming</CardHeader>
              <CardContent centered>
                <CircularProgress />
              </CardContent>
            </Card>
          )}
          {this.state.results.length > 0 && (
            <Card>
              <CardHeader>Results</CardHeader>
              <CardContent>
                <ResultList>
                  {this.state.results.map(result => {
                    return (
                      <Result key={result.run}>
                        {result.run}: {result.time.toFixed(2)} ms{" "}
                        <StatusCode code={result.response.status} />
                      </Result>
                    );
                  })}
                </ResultList>
              </CardContent>
            </Card>
          )}
        </Wrapper>
      </Centered>
    );
  }
}

export default App;
